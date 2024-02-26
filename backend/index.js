import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./Routes/auth.js"
import bookingRoute from "./Routes/booking.js"
import userRoute from "./Routes/user.js"
import doctorRoute from "./Routes/doctor.js"
import reviewRoute from "./Routes/review.js"
import chatRoute from "./Routes/message.js"
import insightRoute from "./Routes/insight.js"
import prescriptionRoute from "./Routes/prescription.js"



dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
  origin: true,
  // Ajoutez d'autres options CORS si nécessaire
};

app.get("/", (req, res) => {
  res.send("Api is working");
});
 
//mongo connection
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    
    })
    console.log("MongoDB database is connected");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    process.exit(1); // Arrête le processus en cas d'échec de connexion
  }
};

// // Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use('/api/v1/auth', authRoute)  
app.use('/api/v1/users', userRoute)  
app.use('/api/v1/doctors', doctorRoute)
app.use('/api/v1/reviews', reviewRoute) 
app.use('/api/v1/bookings', bookingRoute) 
app.use('/api/v1/chat', chatRoute) 
app.use('/api/v1/insights', insightRoute)
app.use('/api/v1/prescriptions', prescriptionRoute)




app.listen(port, () => {
  connectDB();
  console.log("Server is running on port: " + port);
});