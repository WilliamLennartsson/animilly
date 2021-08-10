import * as THREE from "three";
import BasicCharacterController from "../gallerySrc/characterControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import ThirdPersonCamera from './ThirdPersonCamera'

// GLTF Loading
const loadingManager = new THREE.LoadingManager();
loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
  console.log("Progress:", `${((itemsLoaded / itemsTotal) * 100) | 0}%`);
};
loadingManager.onLoad = () => {
  console.log("Model loaded");
};
const loader = new GLTFLoader(loadingManager);

const models = {
  fox: {
    url: "./models/FoxModel/Fox.gltf",
    scale: { x: 0.2, y: 0.2, z: 0.2 },
  },
  duck: {
    url: "./models/DuckModel/Duck.gltf",
    scale: { x: 8, y: 8, z: 8 },
  },
};

const loadDuckModel = (scene) => {
  loader.load(models.duck.url, (gltf) => {
    console.log(`gltf`, gltf);
    scene.add(gltf.scene)
  });
};

// APP entryPoint
const GalleryApp = (config) => {
  const { token, gameClient } = config
  // Renderer
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
  });
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(new THREE.Color(0x222222, 0.5));
  document.body.appendChild(renderer.domElement);
  // -- Renderer --

  // Camera
  const fov = 60;
  const aspect = 1920 / 1080;
  const near = 1.0;
  const far = 1000.0;

  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  // const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  camera.position.set(25, 10, 25);
  // -- Camera --

  // Events
  window.addEventListener(
    "resize",
    () => {
      onWindowResize();
    },
    false
  );
  const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };
  // -- Events --

  // Scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#333333");
  // -- Scene --

  // Lights
  let light = new THREE.DirectionalLight(0xffffff, 1.0);
  light.position.set(-100, 100, 100);
  light.target.position.set(0, 0, 0);
  light.castShadow = true;
  light.shadow.bias = -0.001;
  light.shadow.mapSize.width = 4096;
  light.shadow.mapSize.height = 4096;
  light.shadow.camera.near = 0.1;
  light.shadow.camera.far = 500.0;
  light.shadow.camera.near = 0.5;
  light.shadow.camera.far = 500.0;
  light.shadow.camera.left = 50;
  light.shadow.camera.right = -50;
  light.shadow.camera.top = 50;
  light.shadow.camera.bottom = -50;

  scene.add(light);

  light = new THREE.AmbientLight(0xffffff, 0.25);
  scene.add(light);

  light = new THREE.PointLight("#333333", 1, 5, 2);
  // scene.add(light);

  const skyColor = 0xb1e1ff; // light blue
  const groundColor = 0xb97a20; // brownish orange
  const intensity = 2;
  light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
  scene.add(light);

  // -- Lights --

  // Scene objects
  const floorPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(150, 300, 10, 10),
    new THREE.MeshStandardMaterial({
      color: 0x555555,
    })
  );
  floorPlane.castShadow = false;
  floorPlane.receiveShadow = true;
  floorPlane.rotation.x = -Math.PI / 2;
  scene.add(floorPlane);

  const walls = createWalls(floorPlane);
  scene.add(walls);

  const player = createPlayer();
  scene.add(player);

  loadDuckModel(scene)
  // -- Scene objects --

  // Controls
  const orbitControls = new OrbitControls(camera, renderer.domElement);
  orbitControls.target.set(
    player.position.x,
    player.position.y,
    player.position.z
  );

  const params = {
    camera: camera,
    scene: scene,
    target: player,
  };
  const characterControls = new BasicCharacterController(params);
  // -- Controls --
  console.log(`player`, player)
  const thirdPersonCamera = new ThirdPersonCamera({target: player, camera: camera})

  updateLoop(renderer, scene, camera, thirdPersonCamera, characterControls, orbitControls, player);
};

const updateLoop = (
  renderer,
  scene,
  camera,
  thirdPersonCamera,
  characterControls,
  orbitControls,
  player
) => {
  let previousRAF = null;
  const update = () => {
    requestAnimationFrame((t) => {
      if (previousRAF === null) {
        previousRAF = t;
      }

      renderer.render(scene, camera);
      const deltaTime = (t - previousRAF) * 0.001;

      characterControls.Update(deltaTime);
      orbitControls.update();
      orbitControls.target.set(
        player.position.x,
        player.position.y,
        player.position.z
      );

      // thirdPersonCamera.Update(deltaTime)

      previousRAF = t;

      update();
    });
  };
  update();
};

const createWalls = (floorPlane) => {
  const {
    width: floorWidth,
    height: floorHeight,
  } = floorPlane.geometry.parameters;

  const walls = new THREE.Group();

  const wallNorth = createWall(floorWidth, 20, 0, floorHeight * 0.5, 0);
  const wallSouth = createWall(floorWidth, 20, 0, -floorHeight * 0.5, 0);
  const wallEast = createWall(
    floorHeight,
    20,
    -floorWidth * 0.5,
    0,
    Math.PI / 2
  );
  const wallWest = createWall(
    floorHeight,
    20,
    floorWidth * 0.5,
    0,
    Math.PI / 2
  );

  walls.add(wallSouth);
  walls.add(wallWest);
  walls.add(wallNorth);
  walls.add(wallEast);
  return walls;
};

const createWall = (width, height, translateX, translateZ, rotationY) => {
  const wall = new THREE.Mesh(
    new THREE.BoxGeometry(width, height, 5, 10),
    new THREE.MeshStandardMaterial({
      color: 0x555555,
    })
  );
  wall.translateZ(translateZ);
  wall.translateX(translateX);
  wall.rotation.y = rotationY;
  wall.castShadow = false;
  wall.receiveShadow = true;
  return wall;
};

const createPlayer = () => {
  const sphereRadius = 3;
  const sphereWidthDivisions = 32;
  const sphereHeightDivisions = 16;
  const sphereGeo = new THREE.SphereGeometry(
    sphereRadius,
    sphereWidthDivisions,
    sphereHeightDivisions
  );
  const sphereMat = new THREE.MeshPhongMaterial({ color: "#444444" });
  const player = new THREE.Mesh(sphereGeo, sphereMat);
  player.position.set(-sphereRadius - 1, sphereRadius, 0);
  player.castShadow = true;
  return player;
};

export default GalleryApp;
