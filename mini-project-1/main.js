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

camera.position.z = 4;

const textureLoader = new THREE.TextureLoader();
const earthTex = textureLoader.load("./earth.jpeg");
earthTex.colorSpace = THREE.SRGBColorSpace;

const cloudTex = textureLoader.load("./cloud.jpg");
cloudTex.colorSpace = THREE.SRGBColorSpace;

const hdri = new RGBELoader();

hdri.load(
    "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/meadow_2_2k.hdr",
    function (hdritexture) {
        hdritexture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = hdritexture;
    },
);

const geometry = new THREE.SphereGeometry(2.08, 100, 100);
const material = new THREE.MeshPhysicalMaterial({ map: earthTex });

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const geometry2 = new THREE.SphereGeometry(2.1, 100, 100);
const material2 = new THREE.MeshPhysicalMaterial({ alphaMap: cloudTex });
material2.transparent = true;
const mesh2 = new THREE.Mesh(geometry2, material2);
scene.add(mesh2);

const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
const controls = new OrbitControls(camera, renderer.domElement);

const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    mesh2.rotation.y += 0.001;
    mesh.rotation.y += 0.0005;
    renderer.render(scene, camera);
}

animate();
