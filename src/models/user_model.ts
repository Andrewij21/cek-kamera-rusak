import { model, Schema } from "mongoose";

const User_Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  userName: String,
  password: String,
  contact: String,
  role: String,
});

export default model("user", User_Schema);
