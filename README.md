# Doccure - 😊 Doctor Booking System 😷

Welcome to Doccure, your ultimate destination for hassle-free doctor appointments! 🌟 Built with the powerful MERN stack (MongoDB, Express.js, React, Node.js), Doccure ensures a seamless experience for users seeking medical care. Let's dive into the exciting features that make Doccure stand out:

## Features 🚀

- **User Authentication:** 🔒 Enjoy a secure user authentication and authorization system.
- **Doctor Listing:** 👩‍⚕️👨‍⚕️ Browse through a curated list of available doctors with detailed profiles.
- **Appointment Booking:** 📅 Schedule appointments with your preferred doctors at your convenience.
- **Payment Integration:** 💳 Experience secure and convenient payment processing through the magic of Stripe.
- **Premium Subscription Module:** 💼 Unlock exclusive features and benefits by subscribing to our premium membership.
- **Prescription Module:** 📝 Receive and manage digital prescriptions securely from your healthcare providers.
- **Queries/Email Module:** 📧 Have questions or concerns? Reach out to us via email for prompt assistance and support.
- **Responsive UI:** 📱 Enjoy a user-friendly and modern interface designed with the elegance of Tailwind CSS.

## Tech Stack 💻

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Payment Integration:** Stripe
- **Styling:** Tailwind CSS

🚧 **Works are going on behind the scenes to make Doccure even more amazing! Stay tuned for updates.**

[![Google Sheets](https://img.shields.io/badge/-Testing-Documentation-blue?style=for-the-badge&logo=google&logoColor=white)](https://docs.google.com/spreadsheets/d/e/2PACX-1vQFwOWd2L6Bd6nVvdNxaIfKWZDzqi8Tg2yqq0KOScWHrJdPeOxdCpnt2Ou9ffOzIHVmSIJ7_SFgWUVs/pubhtml)


## Installation and Environment Setup Guide 🔧

### Prerequisites
- Node.js installed on your machine.
- MongoDB Atlas account for database hosting (or MongoDB installed locally).

### Installation Steps
1. Clone the repository:

2. Navigate to the backend directory:

3. Install backend dependencies:
   ```
   npm install
   ```

4. Set up environment variables:
- Create a `.env` file in the backend directory.
- Add the required environment variables, such as:
  ```
  PORT=5000
  DB_URL='mongodb+srv://<username>:<password>@<cluster_url>/<database_name>?retryWrites=true&w=majority'
  JWT_SECRET_KEY=<your_secret_key>
  STRIPE_SECRET_KEY=<your_stripe_secret_key>
  CLIENT_SITE_URL='http://localhost:5173'
  EMAIL_USER=<your_gmail_email_address>
  EMAIL_PASS=<your_gmail_app_password>
  ```

5. Run the backend server:
   ```
   npm run start-dev
   ```

6. Navigate to the frontend directory:

8. Set up frontend environment variables:
- Create a `.env.local` file in the frontend directory.
- Add the required environment variables, such as:
  ```
  VITE_CLOUD_NAME=<your_cloud_name>
  VITE_UPLOAD_PRESET=<your_upload_preset>
  ```

9. Run the frontend server:
   ```
   npm run dev
   ```

10. Access Doccure in your browser:
    ```
    http://localhost:5173
    ```

## Questions or Suggestions? 🤔

Got queries, feedback, or just want to say hi? Shoot us an email at animeshthomas262@gmail.com! We love hearing from you and are committed to making Doccure the best it can be.

Keep smiling, stay healthy, and let Doccure take care of your health journey! 😊💉
