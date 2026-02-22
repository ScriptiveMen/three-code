import GUI from "lil-gui";
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

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: "yellow" });
material.roughness = 0.2;
material.metalness = 0.5;
const mesh = new THREE.Mesh(geometry, material);

mesh.rotation.y = -2;
scene.add(mesh);

const light2 = new THREE.PointLight(0xff0000, 1, 100);
light2.position.set(0.8, 1, 1);
scene.add(light2);

const light = new THREE.PointLight(0xff0000, 1, 100);
light.position.set(-1, -1, 1);
scene.add(light);

window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.updateProjectionMatrix();
});

const gui = new GUI();

/* =========================
   MESH CONTROLS
========================= */

const meshFolder = gui.addFolder("Mesh");

// Rotation
meshFolder.add(mesh.rotation, "x", -Math.PI, Math.PI, 0.01).name("Rotate X");
meshFolder.add(mesh.rotation, "y", -Math.PI, Math.PI, 0.01).name("Rotate Y");
meshFolder.add(mesh.rotation, "z", -Math.PI, Math.PI, 0.01).name("Rotate Z");

// Position
meshFolder.add(mesh.position, "x", -5, 5, 0.01).name("Position X");
meshFolder.add(mesh.position, "y", -5, 5, 0.01).name("Position Y");
meshFolder.add(mesh.position, "z", -5, 5, 0.01).name("Position Z");

// Scale
meshFolder.add(mesh.scale, "x", 0.1, 5, 0.01).name("Scale X");
meshFolder.add(mesh.scale, "y", 0.1, 5, 0.01).name("Scale Y");
meshFolder.add(mesh.scale, "z", 0.1, 5, 0.01).name("Scale Z");

// Material
meshFolder
    .addColor({ color: material.color.getStyle() }, "color")
    .name("Color")
    .onChange((value) => {
        material.color.set(value);
    });

meshFolder.add(material, "roughness", 0, 1, 0.01);
meshFolder.add(material, "metalness", 0, 1, 0.01);

meshFolder.open();

/* =========================
   LIGHT 1 CONTROLS
========================= */

const lightFolder = gui.addFolder("Light 1");

lightFolder.add(light, "intensity", 0, 5, 0.01);
lightFolder.add(light.position, "x", -5, 5, 0.01);
lightFolder.add(light.position, "y", -5, 5, 0.01);
lightFolder.add(light.position, "z", -5, 5, 0.01);

lightFolder
    .addColor({ color: light.color.getStyle() }, "color")
    .name("Color")
    .onChange((value) => {
        light.color.set(value);
    });

/* =========================
   LIGHT 2 CONTROLS
========================= */

const light2Folder = gui.addFolder("Light 2");

light2Folder.add(light2, "intensity", 0, 5, 0.01);
light2Folder.add(light2.position, "x", -5, 5, 0.01);
light2Folder.add(light2.position, "y", -5, 5, 0.01);
light2Folder.add(light2.position, "z", -5, 5, 0.01);

light2Folder
    .addColor({ color: light2.color.getStyle() }, "color")
    .name("Color")
    .onChange((value) => {
        light2.color.set(value);
    });

const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.minAzimuthAngle = -Math.PI / 4;
controls.maxAzimuthAngle = Math.PI / 4;
controls.minPolarAngle = Math.PI / 4;
controls.maxPolarAngle = Math.PI / 2;

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();
