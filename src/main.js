import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three';


// Scene configurations
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('canvas'),
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Orbit Controls 
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Draco Loader
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/');


// Texture loading
const textureLoader = new THREE.TextureLoader();
const floor_roughness_txt = textureLoader.load("public/models/web_format_textures/Saxna_yer_roughness_metallic_AO.1001.webp");
const door_roughness_txt = textureLoader.load("/models/web_format_textures/Saxna_eshiklar_Roughness.1001.webp");
const door_light_txt = textureLoader.load('/models/web_format_textures/Saxna_eshiklar_light.1001.webp');
const door_normal_txt = textureLoader.load("/models/web_format_textures/Saxna_eshiklar_Normal.1001.webp");
const floor_light_txt = textureLoader.load("public/models/web_format_textures/Saxna_yer_light.1001.webp");
const floor_normal_txt = textureLoader.load("public/models/web_format_textures/Saxna_yer_Normal.1001.webp");

const textures = [
    floor_light_txt,
    door_light_txt,
    door_roughness_txt,
    door_normal_txt,
    floor_normal_txt,
    floor_roughness_txt
];

for (let i = 0; i <= textures.length; i++) {
    textures[i].flipY = false;
    textures[i].encoding = THREE.sRGBEncoding;
    textures[i].colorSpace = THREE.SRGBColorSpace;
};





// GLTF Loader
const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);

loader.load(
    '/models/Saxna.glb',
    (gltf) => {
        scene.add(gltf.scene);
        console.log('Model loaded successfully');
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    (error) => {
        console.error('An error happened', error);
    }
);

camera.position.z = 5;
camera.position.y = 2;

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
