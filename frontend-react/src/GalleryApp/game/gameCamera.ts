import { PerspectiveCamera } from 'three/src/cameras/PerspectiveCamera'
import { WorldObject } from './Entity';

export default class GameCamera extends PerspectiveCamera implements WorldObject {
  constructor(fov ?: number, aspect ?: number, near ?: number, far ?: number){
    super(fov, aspect, near, far)
  }

  followMouse = (camera: THREE.PerspectiveCamera, isMouseDown: boolean, x: number, y: number) => {
    if (isMouseDown) {

      // const theta = - ((event.clientX - onMouseDownPosition.x) * 0.5)
      //   + onMouseDownTheta;
      // let phi = ((event.clientY - onMouseDownPosition.y) * 0.5)
      //   + onMouseDownPhi;

      // phi = Math.min(180, Math.max(0, phi));

      // this.position.x = radious * Math.sin(theta * Math.PI / 360)
      //   * Math.cos(phi * Math.PI / 360);
      // this.position.y = radious * Math.sin(phi * Math.PI / 360);
      // this.position.z = radious * Math.cos(theta * Math.PI / 360)
      //   * Math.cos(phi * Math.PI / 360);
      // this.updateMatrix();

    }
  }

  update(delta: number) {}
  cleanup() {}
}

export const followMouse = (camera: THREE.PerspectiveCamera, isMouseDown: boolean, x: number, y: number) => {


  // mouse3D = projector.unprojectVector(
  //   new THREE.Vector3(
  //     (event.clientX / renderer.domElement.width) * 2 - 1,
  //     - (event.clientY / renderer.domElement.height) * 2 + 1,
  //     0.5
  //   ),
  //   camera
  // );
  // ray.direction = mouse3D.subSelf(camera.position).normalize();

  // interact();
  // renderScene();
}
