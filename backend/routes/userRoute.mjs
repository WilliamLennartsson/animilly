import express from "express";
import DB from "../db/index.mjs";
import { validateSignUpData } from "../db/validation.mjs";
import { encrypt, compareHash } from "../db/encryption.mjs";
import { generateAuthToken } from '../db/token.mjs'

const router = express.Router();


class UserErrorModel {
  constructor(title, description, code) {
    this.title = title;
    this.description = description;
    this.code = code;
  }
}

router.post("/signup", async (req, res, next) => {
  try {
    const { email, username, password, confirmPassword } = req.body;
    
    const validatedData = validateSignUpData(email, username, password, confirmPassword)

    if (!validatedData) {
      return res.status(400).send({ message: "Invalid information" });
    }

    const passwordHash = await encrypt(password)
    const newUser = await DB.createUser(email, username, passwordHash);

    delete newUser.password
    
    if (newUser) {
      res.status(200).send(newUser);
    } else {
      res.status(418).send({ message: 'Something went wrong when creating user..' });
    }
  } catch (error) {
    console.log(`error user signup`, error);
    res.status(418).send(error);
  }
});


router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await DB.getUserByEmail(email)

    if (!user) {
      return res.status(401).send({ message: "Incorrect email or password" });
    }

    const correctPassword = compareHash(password, user.password)

    if (!correctPassword) {
        return res.status(401).send({ message: "Incorrect email or password" });
    }

    delete user.password;
    // delete user.isAdmin;
    const token = generateAuthToken(user)

    return res.status(200).send({ message: "Success", token, user });
  
  } catch (error) {
    console.log("Error user singin: " + error);
    res.status(418).send(error);
  }
});

export default router;
