import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    30,
);

camera.position.z = 5;

const geometry = new THREE.BoxGeometry(1, 2, 3);
const material = new THREE.MeshBasicMaterial({ color: "red" });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const mouse = {
    x: 0,
    y: 0,
};

window.addEventListener("mousemove", function (e) {
    mouse.x = e.clientX / window.innerWidth;
    mouse.y = e.clientY / window.innerHeight;
});

window.addEventListener("resize", function (e) {
    camera.aspect = window.innerWidth / window.innerHeight;
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.updateProjectionMatrix();
});

function animate() {
    requestAnimationFrame(animate);
    mesh.lookAt(new THREE.Vector3(mouse.x - 0.5, -mouse.y + 0.5, 1));
    renderer.render(scene, camera);
}

animate();
