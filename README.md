# FixNexus Server Side

### Live Site URL:

Firebase Hosting : [https://fixnexus-aa0eb.web.app/](https://fixnexus-aa0eb.web.app/)

Netlify Hosting : [https://fixnexus.netlify.app/](https://fixnexus.netlify.app/)

## Features and Characteristics:

- Create, Read, Update, and Delete (CRUD) operations
- Uses Express.js for routing and middleware
- Integrates MongoDB for data storage
- Utilizes CORS for Cross-Origin Resource Sharing
- Utilizes JWT for authentication
- Supports environment variables with dotenv

## Prerequisites

- Node.js installed on your machine
- MongoDB installed and running locally or accessible remotely
- npm or yarn package manager installed

## Installation: :computer:

1. Clone the repository from GitHub:

```
git clone https://github.com/Porgramming-Hero-web-course/b9a11-server-side-JuborajSujon

```

2. Navigate to the project directory:

```
cd fixnexus-server
```

3. Install dependencies using npm or yarn:

```
npm install
```

or

```
yarn install
```

4. Set up environment variables:Create a .env file in the root directory and add the following variables:

```
PORT=5000
MONGODB_URI=<your-mongodb-uri>
ACCESS_TOKEN_SECRET=<your-access-token-secret>
```

## Usage: :book:

1. Start the development server:

```
npm run dev
```

The server should now be running on http://localhost:5000

## API Endpoints

- GET /api/home-services

Get 6 services for home from the database

- GET /api/services

Get all services from the database with pagination and search features by service name

- GET /api/services-count

Get all services count from the database base on service name

- GET /api/services/:id

Get a specific service from the database

- GET /api/manage-services/:email

Get all managed services by user email

- POST /api/services

Post a new service to the database

- Put /api/services/:id

Update a specific service in the database

- DELETE /api/services/:id

Delete a specific service from the database

- POST /api/booked-services

Add a new booked service to the database

- GET /api/booked-services/:email

Get all booked services by user email

- PUT /api/booked-services/:id

Update a specific booked service in the database

- DELETE /api/booked-services/:id

Delete a specific booked service from the database

- GET /api/services-to-do/:email

Get all to-do services by user email

## Conclusion: :rocket:

Enjoy exploring and discovering your favorite electronics repair services! :rocket:::rocket:::rocket:
