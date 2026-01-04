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

        this.camera.rotation._x = x;
        this.camera.rotation._y = y;
    }

    update() {

    }
}


export { CharacterController };