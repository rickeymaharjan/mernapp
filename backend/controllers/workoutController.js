const Workout = require("../models/workoutModel")
const mongoose = require("mongoose")

// Getting all workouts
const getAll = (req, res) => {
  Workout.find({})
    .sort({ createdAt: -1 })
    .then((workouts) => res.status(200).json(workouts))
}

// Getting a workout
const getWorkout = (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid) {
    return res.status(404).json({ error: "no such workout" })
  }

  Workout.findById(id)
    .then((workout) => {
      res.status(200).json(workout)
    })
    .catch((error) => {
      res.status(404).json({ error: "no such workout" })
    })
}

// Creating a new workout
const createWorkout = (req, res) => {
  const { title, load, reps } = req.body

  const workout = new Workout({
    title,
    load,
    reps,
  })

  workout
    .save()
    .then(() => {
      res.status(201).json(workout)
    })
    .catch((error) => {
      res.status(400).json({ error: error.message })
    })
}

// Deleting a workout

const deleteWorkout = (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid) {
    return res.status(404).json({ error: "no such workout" })
  }

  Workout.findByIdAndDelete(id)
    .then((workout) => {
      res.status(200).json(workout)
    })
    .catch((error) => {
      res.status(404).json({ error: "no such workout found" })
    })
}

// Updateing a workout

const updateWorkout = (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid workout ID" })
  }

  Workout.findByIdAndUpdate(id, { ...req.body }, { new: true })
    .then((workout) => {
      if (workout) {
        res.status(200).json(workout)
      } else {
        res.status(404).json({ error: "No such workout found" })
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "An error occurred" })
    })
}

module.exports = {
  createWorkout,
  getAll,
  getWorkout,
  deleteWorkout,
  updateWorkout,
}
