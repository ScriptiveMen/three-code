import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { HDRLoader } from "three/addons/loaders/HDRLoader.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
);

camera.position.z = 5;

const hdri = new HDRLoader();

hdri.load(
    "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/german_town_street_2k.hdr",
    function (hdritexture) {
        hdritexture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = hdritexture;
        // scene.background = hdritexture;
    },
);

const modelLoader = new GLTFLoader();
modelLoader.load("./car_scene.glb", function (model) {
    scene.add(model.scene);

    // model.scene.rotation.y = -0.5;
    // model.scene.rotation.x = 0.3;
});

window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.updateProjectionMatrix();
});

const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();
