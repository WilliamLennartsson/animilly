import * as THREE from "three";

export default class ThirdPersonCamera {
  constructor(params) {
    this._params = params;
    this._camera = params.camera;

    this._currentPosition = new THREE.Vector3();
    this._currentLookat = new THREE.Vector3();
  }

  _CalculateIdealOffset() {
    const idealOffset = new THREE.Vector3(-15, 20, -30);
    idealOffset.add(this._params.target.position);
    const rotationAsQuaternion = new THREE.Quaternion()
    rotationAsQuaternion.setFromEuler(this._params.target.rotation)
    idealOffset.applyQuaternion(rotationAsQuaternion);
    return idealOffset;
  }

  _CalculateIdealLookat() {
    const idealLookat = new THREE.Vector3(0, 10, 50);
    idealLookat.applyQuaternion(this._params.target.rotation);
    idealLookat.add(this._params.target.position);
    return idealLookat;
  }

  Update(timeElapsed) {
    const idealOffset = this._CalculateIdealOffset();
    // const idealLookat = this._CalculateIdealLookat();
    // const t = 0.05;
    // const t = 4.0 * timeElapsed;
    const t = 1.0 - Math.pow(0.001, timeElapsed);
    // console.log(`idealOffset, t`, idealOffset, t)
    this._currentPosition.lerp(idealOffset, t);
    // this._currentLookat.lerp(idealLookat, t);

    this._camera.position.copy(this._currentPosition);
    // this._camera.lookAt(this._currentLookat);
  }
}
