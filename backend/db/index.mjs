import mongoose from "mongoose";
import models from "./models/index.mjs";
import { encrypt } from "./encryption.mjs";

class DBResponse {
  constructor() {
    this.error = null;
    this.data = null;
    this.status = 0; // Code
  }
}

class DBClient {
  constructor() {}

  /**************
   *    USERS
   *************/
  getUserByEmail(email) {
    return models.users.findOne({ email: email }).then((user) => {
      if (user) return user.toClient();
      return user;
    });
  }

  getUserById(id) {
    return models.users.findOne({ _id: id }).then((user) => {
      if (user) return user.toClient();
      return user;
    });
  }

  createUser(email, username, password) {
    return new Promise((resolve, reject) => {
      this.getUserByEmail(email).then((existingUser) => {
        if (existingUser) {
          reject({ message: "An account with that email already exists" });
        }

        models.users
          .create({
            email,
            username,
            password,
          })
          .then((user) => {
            console.log("\n>> Created User:\n", user);
            resolve(user.toJSON());
          })
          .catch((err) => {
            reject(err);
          });
      });
    });
  }

  /**************
   *    GALLEELIES
   *************/
  getGalleryById(id) {
    return models.galleries.findOne({ _id: id }).then((gallery) => {
      if (gallery) return gallery.toClient();
      return gallery;
    });
  }
  
  getGalleriesForUser(userId) {
    return models.galleries.find({ hostId: userId }).then((galleries) => {
      if (galleries) {
        return galleries.forEach((gallery) => gallery.toClient());
      }
      return galleries;
    });
  }

  createGallery(host) {
    const gallery = {
      hostName: host.username,
      hostId: host.id,
      paintings: [],
      layout: "basic",
    };
    return new Promise((resolve, reject) => {
      models.galleries
        .create(gallery)
        .then((gallery) => {
          console.log("\n>> Created gallery:\n", gallery);
          resolve(gallery.toJSON());
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  /**************
   *    PAINTINGS
   *************/
}

export default new DBClient();
