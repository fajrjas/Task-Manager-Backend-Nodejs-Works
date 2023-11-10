require("dotenv").config();
const express = require("express");
const connectDB = require("./db/connect");
const Task = require("./model/Task");
const app = express();

app.use(express.json());
app.use(express.static("./public"));

app.get("/tasks", async (req, res) => {
  const task = await Task.find({});
  res.status(200).json({ task });
});
app.post("/tasks", async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(200).json({ task });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(401)
        .json({ success: false, message: "Task already available" });
    }
    console.log(error);
    res.status(400).json({ error: error });
  }
});

app.get("/tasks/:id", async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findById({ _id: taskID });

  if (!task) {
    return res.status(404).json({ message: `No task found with id ${taskID}` });
  }
  res.status(200).json({ task });
});
app.patch("/tasks/:id", async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return res.status(404).json({ message: `No task found with id ${taskID}` });
  }
  res.status(200).json({ task });
});
app.delete("/tasks/:id", async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });

  if (!task) {
    return res.status(404).json({ message: `No task found with id ${taskID}` });
  }
  res.status(200).json({ task });
});

const start = async () => {
  await connectDB(process.env.MONGO_URI);
  app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
  });
};

start();
