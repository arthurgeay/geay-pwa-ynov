import mongoose from "mongoose";

const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    done: {
      type: Boolean,
      default: false,
    },
    taskList: {
      type: Schema.Types.ObjectId,
      ref: "TaskList",
      required: true,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
