import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    20,
);

camera.position.z = 5;

const cubegeo = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
const cubemat = new THREE.MeshBasicMaterial({ color: "red", wireframe: true });
const cube = new THREE.Mesh(cubegeo, cubemat);

cube.position.x = -1;
scene.add(cube);

const spheregeo = new THREE.SphereGeometry(1, 40, 15);
const spheremat = new THREE.MeshBasicMaterial({
    color: "blue",
    wireframe: true,
});
const sphere = new THREE.Mesh(spheregeo, spheremat);

sphere.position.x = 1;
scene.add(sphere);

const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

// rotation
// cube.rotation.z = Math.PI - 0.1;

// grouping
const group = new THREE.Group();
group.add(cube);
group.add(sphere);

// adding group into scene
scene.add(group);
group.position.x = -2;

renderer.render(scene, camera);
