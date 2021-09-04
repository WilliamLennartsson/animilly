import mongoose from "mongoose";
import { validateEmail } from "../validation.mjs";

const GallerySchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    trim: true,
    auto: true,
    unique: true,
  },
  hostName: {
    type: String,
    required: true,
  },
  hostId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  paintings: {
    type: mongoose.Schema.Types.Array,
    required: true,
  },
  layout: {
    type: String,
    required: true
  }
});
GallerySchema.method("toClient", function () {
  const obj = this.toObject();
  //Rename fields
  obj.id = obj._id;
  delete obj._id;

  return obj;
});
const Gallery = mongoose.model("Gallery", GallerySchema);
export default Gallery;
//Author: Mohammad Arman Khan
//Regular Expresssion for e-mail validation
