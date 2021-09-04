import * as THREE from "three";

export interface WorldObject {
  update: (delta: number) => void
  cleanup: () => void
}

export interface Entity extends WorldObject {
  geometry: THREE.BoxGeometry
  material: THREE.MeshBasicMaterial
  body: THREE.Mesh
}

export const createEntity = ({ x = 0, y = 0, z = 0, width = 1, height = 1, depth = 1, color = 0xff00ff }): Entity => {
  const geometry = new THREE.BoxGeometry(width, height, depth);
  const material = new THREE.MeshBasicMaterial({ color: color });
  const body = new THREE.Mesh(geometry, material);

  body.position.x = x;
  body.position.y = y;
  body.position.z = z;

  const update = () => {
    // body.rotation.x += 0.01;
    // body.rotation.y += 0.01;
  };

  const cleanup = () => {
    geometry.dispose();
    material.dispose();
  };
  return { body, material, geometry, cleanup, update };
};
