import mongoose from "mongoose";
import { validateEmail } from "../validation.mjs";

const UserSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    trim: true,
    auto: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validator: [validateEmail, "Invalid email"],
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.method("toClient", function () {
  const obj = this.toObject();
  //Rename fields
  obj.id = obj._id;
  delete obj._id;

  return obj;
});

const User = mongoose.model("User", UserSchema);
export default User;
//Author: Mohammad Arman Khan
//Regular Expresssion for e-mail validation
