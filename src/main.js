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
    {
        texture: floor_roughness_txt,
        isColorSpace: false,
    },
    {
        texture: floor_light_txt,
        isColorSpace: true,
    },
    {
        texture: floor_normal_txt,
        isColorSpace: false,
    },
    {
        texture: door_roughness_txt,
        isColorSpace: false,
    },
    {
        texture: door_light_txt,
        isColorSpace: true,
    },
    {
        texture: door_normal_txt,
        isColorSpace: false,
    }
];


for (let i = 0; i < textures.length; i++) {
    if (textures[i].isColorSpace) {
        textures[i].texture.colorSpace = THREE.SRGBColorSpace;
    } else {
        textures[i].texture.colorSpace = THREE.NoColorSpace;
    }

    textures[i].texture.flipY = false;
};


// GLTF Loader
const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);

loader.load(
    '/models/Saxna.glb',
    (gltf) => {
        const model = gltf.scene;
        console.log(model);

        model.traverse((child) => {
            if (child.isMesh) {
                if (child.name.includes("eshik")) {
                    console.log("door child: ", child);
                    child.material = new THREE.MeshStandardMaterial({
                        map: door_light_txt,
                        roughnessMap: door_roughness_txt,
                        normalMap: door_normal_txt,
                        emissiveMap: door_light_txt,
                        emissive: new THREE.Color(0xffffff),
                        emissiveIntensity: 1.0
                    });

                    child.castShadow = true;
                    child.receiveShadow = true;

                    child.geometry.attributes.uv2 = child.geometry.attributes.uv;
                }

                else {

                    console.log("eshik child: ", child);
                    child.material = new THREE.MeshStandardMaterial({
                        map: floor_light_txt,
                        roughnessMap: floor_roughness_txt,
                        normalMap: floor_normal_txt,
                        emissiveMap: floor_light_txt,
                        emissive: new THREE.Color(0xffffff),
                        emissiveIntensity: 1.0
                    });

                    child.castShadow = true;
                    child.receiveShadow = true;

                    child.geometry.attributes.uv2 = child.geometry.attributes.uv;

                }
            }
        });

        scene.add(model);
        console.log('Model with packed textures loaded!');
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    (error) => {
        console.error('An error happened', error);
    }
);

camera.position.z = 1;
camera.position.y = 2;

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
    console.log(camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
