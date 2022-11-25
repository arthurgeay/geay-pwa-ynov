import mongoose from "mongoose";

const { Schema } = mongoose;

const taskListSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const TaskList = mongoose.model("TaskList", taskListSchema);

export default TaskList;
