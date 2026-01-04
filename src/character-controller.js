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

    mouseMove(event) {
        const x = event.clientX;
        const y = event.clientY;

        if (!this.camera) {
            console.log("Camera is not working !");
            return;
        } else {
            console.log("Camera is now working fine!", this.camera);
        };
    }

    update() {

    }
}


export { CharacterController };