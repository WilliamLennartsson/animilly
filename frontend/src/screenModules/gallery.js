import GalleryApp from "../gallerySrc/galleryApp.js";
import GameClient from "../multiplayer/serverClient.js";
import AuthClient from "../auth/authClient.js";

window.onload = () => {
  GalleryApp()
  const client = new GameClient();  
  const authClient = new AuthClient();
  console.log(`authClient.retreiveAuthToken()`, authClient.retreiveAuthToken());
};
