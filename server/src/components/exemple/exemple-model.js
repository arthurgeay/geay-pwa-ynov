import mongoose from "mongoose";

const { Schema } = mongoose;

const exempleSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    birthdate: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Exemple = mongoose.model("Exemple", exempleSchema);

export default Exemple;
