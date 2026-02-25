import * as THREE from "three";
import { HDRLoader } from "three/addons/loaders/HDRLoader.js";

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

const textures = [
    "./scilla/color.png",
    "./earth/map.jpg",
    "./venus/map.jpg",
    "./volcanic/color.png",
];

const hdri = new HDRLoader();
hdri.load(
    "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/moonlit_golf_2k.hdr",
    function (hdritexture) {
        hdritexture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = hdritexture;
    },
);
const textureLoader = new THREE.TextureLoader();
const bigSpehereTexture = textureLoader.load("./stars.jpg");
bigSpehereTexture.colorSpace = THREE.SRGBColorSpace;

const bigSphereGeo = new THREE.SphereGeometry(50, 64, 64);
const bigSphereMat = new THREE.MeshBasicMaterial({
    map: bigSpehereTexture,
    side: THREE.BackSide,
    opacity: 0.5,
    transparent: true,
});
const bigSphere = new THREE.Mesh(bigSphereGeo, bigSphereMat);
scene.add(bigSphere);

const sphereGroup = new THREE.Group();
for (let i = 0; i < 4; i++) {
    const texture = textureLoader.load(textures[i]);
    texture.colorSpace = THREE.SRGBColorSpace;

    const geometry = new THREE.SphereGeometry(radius, segments, segments);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const sphere = new THREE.Mesh(geometry, material);

    const angle = (i / 4) * (Math.PI * 2);
    sphere.position.x = orbitRadius * Math.cos(angle);
    sphere.position.z = orbitRadius * Math.sin(angle);

    sphereGroup.add(sphere);
}
sphereGroup.rotation.x = 0.11;
sphereGroup.position.y = -0.9;
scene.add(sphereGroup);

const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

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
