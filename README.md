# Doccure — Healthcare & Doctor Appointment Booking Platform

Doccure is a full-stack healthcare platform built with the MERN stack (MongoDB, Express.js, React, Node.js). It enables patients to discover medical specialists, schedule appointment consultations, access digital prescriptions, and process payments securely.

## Features

- **Authentication & Authorization**: Secure JWT-based authentication with role-separated flows for patients and practitioners.
- **Doctor Directory**: Search and filter healthcare specialists by specialty, consultation fee, experience, and patient ratings.
- **Appointment Scheduling**: Real-time appointment booking and consultation calendar management.
- **Prescription Management**: Issue, view, and store patient digital prescriptions and medical records.
- **Payment Processing**: Integrated Stripe checkout for processing consultation fees.
- **Responsive Interface**: Mobile-friendly frontend built with Tailwind CSS.

## Tech Stack

- **Frontend**: React.js, Tailwind CSS, Vite
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Payments**: Stripe API

## Getting Started

### Prerequisites

Ensure you have the following installed:
- Node.js (v16+)
- npm or yarn
- MongoDB instance (local or MongoDB Atlas connection string)

### Backend Setup

1. Navigate to the backend directory:
   `ash
   cd backend
   `

2. Install dependencies:
   `ash
   npm install
   `

3. Configure environment variables by creating a .env file in ackend/:
   `env
   PORT=5000
   DB_URL=mongodb+srv://<username>:<password>@<cluster_url>/<database>?retryWrites=true&w=majority
   JWT_SECRET_KEY=<your_jwt_secret>
   STRIPE_SECRET_KEY=<your_stripe_secret_key>
   CLIENT_SITE_URL=http://localhost:5173
   EMAIL_USER=<your_email_address>
   EMAIL_PASS=<your_email_app_password>
   `

4. Start the backend development server:
   `ash
   npm run start-dev
   `

### Frontend Setup

1. Navigate to the frontend directory:
   `ash
   cd frontend
   `

2. Install dependencies:
   `ash
   npm install
   `

3. Configure environment variables by creating a .env.local file in rontend/:
   `env
   VITE_CLOUD_NAME=<your_cloud_name>
   VITE_UPLOAD_PRESET=<your_upload_preset>
   `

4. Start the frontend development server:
   `ash
   npm run dev
   `

5. Access the application in your browser at http://localhost:5173.

## License

This project is licensed under the MIT License.