const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://fixnexus-aa0eb.web.app",
    "https://fixnexus-aa0eb.firebaseapp.com",
  ],
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@atlascluster.xgsegjb.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const servicesCollection = client.db("fixnexus").collection("services");
    const bookedServicesCollection = client
      .db("fixnexus")
      .collection("bookedServices");

    // Get 6 items for home services
    app.get("/home-services", async (req, res) => {
      const services = await servicesCollection.find().limit(6).toArray();
      res.send(services);
    });

    // Get all services data
    app.get("/services", async (req, res) => {
      const size = parseInt(req.query.size);
      const page = parseInt(req.query.page) - 1;
      const search = req.query.search;
      let query = {
        serviceName: { $regex: search, $options: "i" },
      };

      const services = await servicesCollection
        .find(query)
        .skip(page * size)
        .limit(size)
        .toArray();
      res.send(services);
    });

    // Get all service data count from db
    app.get("/services-count", async (req, res) => {
      const search = req.query.search;
      let query = {
        serviceName: { $regex: search, $options: "i" },
      };
      const count = await servicesCollection.countDocuments(query);
      res.send({ count });
    });

    // Get a single service data by id
    app.get("/services/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const service = await servicesCollection.findOne(query);
      res.send(service);
    });

    // Get all managed service data by email
    app.get("/manage-services/:email", async (req, res) => {
      const email = req.params.email;
      const query = { providerEmail: email };
      const services = await servicesCollection.find(query).toArray();
      res.send(services);
    });

    // Save a service data in MongoDB
    app.post("/services", async (req, res) => {
      const service = req.body;
      const result = await servicesCollection.insertOne(service);
      res.send(result);
    });

    // Update a service data by id
    app.put("/services/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const service = req.body;
      const option = { upsert: true };
      const updatedService = {
        $set: {
          ...service,
        },
      };
      const result = await servicesCollection.updateOne(
        filter,
        updatedService,
        option
      );
      res.send(result);
    });

    // Save a booked service data in MongoDB
    app.post("/booked-services", async (req, res) => {
      const bookedService = req.body;
      const result = await bookedServicesCollection.insertOne(bookedService);
      res.send(result);
    });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}
run().catch(console.log);

app.get("/", (req, res) => {
  res.send("FixNexus Server is running....");
});

app.listen(port, () => console.log(`Server running on port ${port}`));
