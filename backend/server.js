import express from "express";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";
import tvRoutes from "./routes/tv.route.js";
import searchRoutes from "./routes/search.route.js";

import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";
import { protectRoute } from "./middleware/protectRoute.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v2/auth", authRoutes);
app.use("/api/v2/movie", protectRoute, movieRoutes);
app.use("/api/v2/tv", protectRoute, tvRoutes);
app.use("/api/v2/search", protectRoute, searchRoutes);

app.listen(ENV_VARS.PORT, () => {
  console.log(`server is running on port: ${ENV_VARS.PORT}`);
  connectDB();
});
