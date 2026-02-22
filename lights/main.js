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
const material = new THREE.MeshBasicMaterial({ color: "red" });
const mesh = new THREE.Mesh(geometry, material);
mesh.position.x = -2;

scene.add(mesh);

const geometry2 = new THREE.SphereGeometry(1, 100, 100);
const material2 = new THREE.MeshBasicMaterial({ color: "blue" });
const mesh2 = new THREE.Mesh(geometry2, material2);
mesh2.position.x = 2;
scene.add(mesh2);

// raycaster
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

// store original colors
mesh.userData.originalColor = mesh.material.color.getHex();
mesh2.userData.originalColor = mesh2.material.color.getHex();

function onPointMove(event) {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(pointer, camera);

    const intersects = raycaster.intersectObjects([mesh, mesh2]);

    // reset both objects first
    mesh.material.color.set(mesh.userData.originalColor);
    mesh2.material.color.set(mesh2.userData.originalColor);

    // if hovering something
    if (intersects.length > 0) {
        intersects[0].object.material.color.set("yellow");
    }
}

window.addEventListener("mousemove", onPointMove);

const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();
