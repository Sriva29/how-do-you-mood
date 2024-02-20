// Custom class for a draggable slider
// Takes inputs for pos, steps, labels, images and callback

export default class Slider {
    constructor(scene, x, y, width, steps, imgScale, callback) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.width = width;
        this.steps = steps;
        this.callback = callback;

        // The number of steps calc
        this.stepsNo = Object.keys(steps).length;

        // Slider spine
        this.bg = scene.add.rectangle(x, y, width, 10, 0x534741).setOrigin(0, 0.5); 

        // Draggable handle
        this.handle = scene.add.rectangle(x, y, 10, 40, 0x534741).setOrigin(0.5, 0.5).setInteractive();
        scene.input.setDraggable(this.handle);

        // Create labels and images for steps
        this.stepImages = [];
        const stepWidth = width / (this.stepsNo - 1);
        Object.entries(steps).forEach(([label, imageKey], index) => {
            const stepX = x + index * stepWidth;
            // Adding label below the slider
            scene.add.text(stepX, y + 30, label, { font: '14px Happy Monkey', color: '#ffffff' }).setOrigin(0.5);
            // Adding step image above the slider
            const img = scene.add.image(stepX, y - 80, imageKey).setScale(imgScale).setVisible(false);
            this.stepImages.push(img);
        });

        

        // Drag events
        scene.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            if (gameObject === this.handle) {
                let closestStep = this.getClosestStep(dragX);
                this.handle.x = closestStep.x;
                this.updateStepImage(closestStep.index);
                this.callback(closestStep.index);
            }
        });
    }

    getClosestStep(dragX) {
        const stepWidth = this.width / (this.stepsNo - 1);
        let closestIndex = Math.round((dragX - this.x) / stepWidth);
        closestIndex = Phaser.Math.Clamp(closestIndex, 0, this.stepsNo - 1);
        return { index: closestIndex, x: this.x + closestIndex * stepWidth };
    }

    updateStepImage(index) {
        this.stepImages.forEach((img, i) => {
            img.setVisible(i === index);
        });
    }
}
