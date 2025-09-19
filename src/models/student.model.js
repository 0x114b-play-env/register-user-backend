import mongoose from "mongoose";
import { type } from "os";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    age: {
      type: Number,
    },
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    photo: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
      secure_url: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);
