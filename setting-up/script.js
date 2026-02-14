const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
);

const geometry = new THREE.BoxGeometry(1, 1, 1, 3, 3, 3);
const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 3;

const canvas = document.querySelector("canvas");

const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

function animate() {
    window.requestAnimationFrame(animate);
    // cube.rotation.x += 0.03;
    cube.rotation.z += 0.02;
    cube.rotation.y += 0.02;
    renderer.render(scene, camera);
}

animate();
