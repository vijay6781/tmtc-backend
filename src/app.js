import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import itineraryRoutes from "./routes/Itinerary.js";
import { swaggerDocs } from "./config/swagger.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/itineraries", itineraryRoutes);

swaggerDocs(app);

connectDB();

export default app;
