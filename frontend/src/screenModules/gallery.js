import GalleryApp from "../gallerySrc/galleryApp.js";
import GameClient from "../multiplayer/serverClient.js";
import AuthClient from "../auth/authClient.js";

window.onload = () => {
  const authClient = new AuthClient();
  const gameClient = new GameClient();
  console.log(`authClient.retreiveAuthToken()`, authClient.retreiveAuthToken());
  GalleryApp({
    token: authClient.retreiveAuthToken(),
    gameClient: gameClient
  })
};
