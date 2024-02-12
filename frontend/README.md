## Frontend Setup Guide 🛠️

This guide will walk you through setting up the frontend of the Doccure project using React and Vite.

### Installation Steps

1. Clone the repository:

2. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

### Running the Development Server

To start the development server with hot module replacement (HMR), run:

```bash
npm run dev
```

This will start the development server at `http://localhost:3000`.

### Building for Production

To build the frontend for production, run:

```bash
npm run build
```

This will create an optimized build in the `dist` directory.

### Environment Variables

Create a `.env.local` file in the frontend directory and add any required environment variables. For example:

```plaintext
VITE_CLOUD_NAME=<your_cloud_name>
VITE_UPLOAD_PRESET=<your_upload_preset>
```

### Additional Information

For more information on using Vite with React, refer to the [Vite documentation](https://vitejs.dev/guide/features.html).

Keep in mind that the frontend interacts with the backend server, so ensure that the backend server is running concurrently for full functionality.

Now you're ready to start working on the frontend of Doccure! 🚀 If you have any questions or encounter any issues, feel free to reach out. Happy coding!
