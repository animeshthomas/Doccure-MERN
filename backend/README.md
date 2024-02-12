## Backend Setup Guide 🛠️

This guide will help you set up the backend of the Doccure project using Node.js, Express.js, and MongoDB.

### Prerequisites

- Node.js installed on your machine.
- MongoDB Atlas account for database hosting (or MongoDB installed locally).

### Installation Steps

1. Clone the repository:

2. Navigate to the backend directory:

   ```bash
   cd backend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

### Setting Up Environment Variables

1. Create a `.env` file in the backend directory.

2. Add the required environment variables:

   ```plaintext
   PORT=5000
   DB_URL='mongodb+srv://<username>:<password>@<cluster_url>/<database_name>?retryWrites=true&w=majority'
   JWT_SECRET_KEY=<your_secret_key>
   STRIPE_SECRET_KEY=<your_stripe_secret_key>
   ```

   Make sure to replace `<username>`, `<password>`, `<cluster_url>`, `<database_name>`, `<your_secret_key>`, and `<your_stripe_secret_key>` with your actual values.

### Running the Backend Server

To start the backend server in development mode, run:

```bash
npm run start-dev
```

### Additional Information

- The backend server will run on `http://localhost:5000` by default.
- Ensure that MongoDB is running and accessible by the backend server.

Now you're ready to work on the backend of Doccure! If you have any questions or encounter any issues, feel free to reach out. Happy coding! 🚀