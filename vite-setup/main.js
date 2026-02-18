import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";

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

const textureLoader = new THREE.TextureLoader();
const tex = textureLoader.load("./map.png");
tex.colorSpace = THREE.SRGBColorSpace;

const geo = new THREE.SphereGeometry(1, 40, 40);
const material = new THREE.MeshStandardMaterial({ map: tex });
const mesh = new THREE.Mesh(geo, material);
scene.add(mesh);

let hdri = new RGBELoader();
hdri.load("", function (hdritexture) {
    hdritexture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = hdritexture;
});

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
