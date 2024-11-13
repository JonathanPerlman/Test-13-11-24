import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import authRouters from "./routes/authRoute";
import connectDb from "./config/db";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());
connectDb();

// Routes


app.use("/api", authRouters);   

// Error handling middleware

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

