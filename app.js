// Import packages
import express from "express"
import cors from "cors"

// Import routes
import galleryRoutes from "./routes/galleryRoutes.js"
import testimonialRoutes from "./routes/testimonialRoutes.js"

// Create Express app
const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use("/api/gallery", galleryRoutes)
app.use("/api/testimonials", testimonialRoutes)

// Test route
app.get("/", (req, res) => {
  res.send("Pixel Photography Backend is running ✅")
})

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
