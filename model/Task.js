const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: [true, "Please enter a task"],
    trim: true,
    maxlength: [20, "Task input must not exceed more than 20 characters"],
    unique: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Task", TaskSchema);
