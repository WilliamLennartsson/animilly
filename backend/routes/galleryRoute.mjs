import express from "express";
import DB from "../db/index.mjs";
import { authUser } from '../middlewares/auth.mjs'

const router = express.Router();

router.post("/create", authUser, async (req, res, next) => {
  try {
    const host = req.user
    
    const newGallery = await DB.createGallery(host);

    if (newGallery) {
      res.status(200).send(newGallery);
    } else {
      res
        .status(418)
        .send({ message: "Something went wrong when creating gallery.." });
    }
  } catch (error) {
    console.log(`error creating gallery`, error);
    res.status(418).send(error);
  }
});

export default router;
