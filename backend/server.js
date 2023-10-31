require("dotenv").config()
const morgan = require("morgan")
const express = require("express")
const app = express()
const workoutRoutes = require("./routes/workouts")
const mongoose = require("mongoose")

// Middleware
app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      JSON.stringify(req.body),
    ].join(" ")
  })
)

app.use(express.json())

// Route
app.use("/api/workouts", workoutRoutes)

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    const port = process.env.PORT

    app.listen(port, () => {
      console.log("Connected to the database.")
      console.log(`Server running on http://localhost:3000/`)
    })
  })
  .catch((error) => console.log(error.message))
