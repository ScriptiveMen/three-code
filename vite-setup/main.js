import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    20,
);

camera.position.z = 5;

const light = new THREE.DirectionalLight("white", 2);
light.position.set(2, 1, 2);
scene.add(light);

const helper = new THREE.DirectionalLightHelper(light, 0.8);
scene.add(helper);

const geo = new THREE.SphereGeometry(1, 40, 40);
const material = new THREE.MeshStandardMaterial({ color: "white" });
const mesh = new THREE.Mesh(geo, material);
scene.add(mesh);

const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
    window.requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();
