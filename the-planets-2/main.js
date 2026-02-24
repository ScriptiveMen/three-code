import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    25,
    window.innerWidth / window.innerHeight,
    0.1,
    100,
);

camera.position.z = 9;

const radius = 1.3;
const segments = 64;
const orbitRadius = 4.3;
const colors = ["red", "yellow", "green", "blue"];

const sphereGroup = new THREE.Group();
for (let i = 0; i < 4; i++) {
    const geometry = new THREE.SphereGeometry(radius, segments, segments);
    const material = new THREE.MeshBasicMaterial({ color: colors[i] });
    const sphere = new THREE.Mesh(geometry, material);

    const angle = (i / 4) * (Math.PI * 2);
    sphere.position.x = orbitRadius * Math.cos(angle);
    sphere.position.z = orbitRadius * Math.sin(angle);

    sphereGroup.add(sphere);
}
sphereGroup.rotation.x = 0.15;
sphereGroup.position.y = -0.7;
scene.add(sphereGroup);

const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const clock = new THREE.Clock();
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", (e) => {
    camera.aspect = window.innerWidth / window.innerHeight;
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.updateProjectionMatrix();
});
