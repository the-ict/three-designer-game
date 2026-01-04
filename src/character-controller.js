import * as THREE from 'three';

class CharacterController {
    constructor(camera, canvas, scene) {
        this.camera = camera;
        this.canvas = canvas;
        this.scene = scene;
    }

    information() {
        console.log("scene: ", this.scene);
        console.log("canvas: ", this.canvas);
        console.log("camera: ", this.camera);
    }

    capsule() {
        const geometry = new THREE.CapsuleGeometry(5, 24.041, 10, 20, 1);

        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

        const capsule = new THREE.Mesh(geometry, material);

        this.scene.add(capsule);
    }

    mouseMove(event) {
        const x = event.clientX;
        const y = event.clientY;

        if (!this.camera) {
            return;
        } else {
        };
    }

    update() {

    }
}


export {
    CharacterController
};