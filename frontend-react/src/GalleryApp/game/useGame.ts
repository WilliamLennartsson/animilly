import { User } from './../../store/models';
import { useAppDispatch, useAppSelector } from './../../store/hooks';
import { selectUser } from './../../store/slices/authSlice';
import { createEntity, Entity } from './Entity';
import { useEffect } from 'react';
import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import GameCamera from './gameCamera'
import InputManager from './InputManager'
import { Player } from '../../store/models';

export interface GameApi {
  init: (container: HTMLDivElement) => void
  serverUpdate: (data: any) => void
  addPlayer: (player: Player, user: User) => void
}

const useGame = (): GameApi => {
  // const user = useAppSelector(selectUser)

  const entities: Entity[] = []

  let initted: boolean = false
  let width: number
  let height: number
  let frameId: number | null
  let clock: THREE.Clock
  let scene: THREE.Scene
  let camera: THREE.PerspectiveCamera
  let renderer: THREE.WebGLRenderer
  let inputManager: InputManager

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseEvent)
    return () => {
      stop();
      window.removeEventListener("resize", () => handleResize);
      entities.forEach(e => e.cleanup())
      // mount.current.removeChild(renderer.domElement);
    };
  }, [])

  const init = (container: HTMLDivElement) => {
    if (!container) return false

    console.log("Initting")
    width = container.clientWidth;
    height = container.clientHeight;
    clock = new THREE.Clock();
    scene = new THREE.Scene();
    camera = new GameCamera(75, width / height, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor("#888888");
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);
    // window.addEventListener("resize", handleResize);
    window.removeEventListener("resize", () => { handleResize(container) });

    camera.position.set(25, 10, 25);

    inputManager = new InputManager()
    const orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.target.set(0, 0, 0);

    // Test entity
    // Start loop
    start()
    initted = true
    return true
  }

  const addPlayer = (player: Player, user: User) => {
    console.log(`player, user`, player, user)
    if (!user) {
      console.log("User undefined. Should not be able to add new player")
      return
    }
    const isMain = user.id === player.userId
    console.log("adding player", player, ". isMain: ", isMain)
    const entity = createEntity({
      x: Math.random() * 2,
      y: 1,
      z: Math.random() * 2,
      width: 3,
      height: 3,
      depth: 3,
    })
    scene.add(entity.body)
    entities.push(entity)

    // If the added player is client player or remote player
    if (isMain) {
      console.log("Is main player")
      setupKeyControls(entity)
    }
  }

  const handleResize = (container: HTMLDivElement) => {
    width = container.clientWidth;
    height = container.clientHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateMatrix();
    renderScene();
  };

  const handleMouseEvent = (event: MouseEvent) => {
    event.preventDefault();
    // console.log(`event`, event)

  }

  const setupKeyControls = (player: Entity) => {
    // TODO: Adjust based on player rotation
    // const rotation = player.body.up
    const playerSpeed = 2
    inputManager.subscribe('KeyW', () => { 
      player.body.translateZ(playerSpeed)
      console.log('KeyW')
    })
    inputManager.subscribe('KeyA', () => { 
      player.body.translateX(-playerSpeed)
      console.log('KeyA')
    })
    inputManager.subscribe('KeyS', () => { 
      player.body.translateZ(-playerSpeed)
      console.log('KeyS')
    })
    inputManager.subscribe('KeyD', () => { 
      player.body.translateX(playerSpeed)
      console.log('KeyD')
    })
  }

  const serverUpdate = () => { }
  const update = () => {
    if (!initted) return

    const delta = clock.getDelta();
    const keys = inputManager.getKeys
    // camera.rotateOnAxis(new THREE.Vector3(0, 0, 1), 0.1)
    entities.forEach(e => e.update(delta))
    renderScene();
    frameId = window.requestAnimationFrame(update);
  };

  const renderScene = () => {
    renderer.render(scene, camera);
  };

  const start = () => {
    if (!frameId) {
      frameId = requestAnimationFrame(update);
    }
  };

  const stop = () => {
    if (frameId) cancelAnimationFrame(frameId);
    frameId = null;
  };

  return {
    init,
    serverUpdate,
    addPlayer
  }
}

export default useGame