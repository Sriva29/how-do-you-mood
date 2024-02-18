// ImageSelector.js
export default class ImageSelector {
    constructor(scene, imageKeys, onSelectCallback) {
        this.scene = scene;
        this.imageKeys = imageKeys;
        this.onSelectCallback = onSelectCallback;
        this.selectedKey = null; // To store the key of the selected image

        this.images = []; // To store image objects for easy access

        this.createImages();
    }

    createImages() {
        const startX = 100; // Starting x position for the first image
        const startY = 250; // Y position for all images
        const spacing = 120; // Spacing between images

        this.imageKeys.forEach((key, index) => {
            const image = this.scene.add.image(startX + (spacing * index), startY, key).setInteractive();
            image.setScale(0.5); // Scale down image for display
            image.on('pointerdown', () => this.selectImage(key));

            this.images.push(image);
        });
    }

    selectImage(selectedKey) {
        this.selectedKey = selectedKey;
        console.log(`Selected image: ${selectedKey}`);

        // Optionally highlight the selected image or invoke a callback
        if (this.onSelectCallback) {
            this.onSelectCallback(selectedKey);
        }

        // Highlight logic or visual feedback for selection can go here
        this.images.forEach(image => {
            // Reset any previous highlight
            image.setTint(0xffffff); // Remove tint from all images
        });

        // Find the selected image and apply a tint or highlight
        const selectedImage = this.images.find(image => image.texture.key === selectedKey);
        if (selectedImage) {
            selectedImage.setTint(0x008291);
             // Set tint to dark blue

            // Animate the selected image to constantly wiggle
            this.animateImage(this.images.indexOf(selectedImage), { angle: 10 }, 500, 'Sine.easeInOut', true, true);
        }
    }


    resetSelection() {
        this.selectedKey = null;
        this.images.forEach(image => {
            image.setTint(0xffffff); // Remove tint from all images
        });
    }

    // Adjust to control visibility rather than recreate images
    displayImages(visible = true) {
        this.images.forEach(image => {
            image.setVisible(visible);
        });
    }

    // Add method to update image positions
    pos(positions) {
        positions.forEach((position, index) => {
            if (this.images[index] && position) {
                this.images[index].setPosition(position.x, position.y);
            }
        });
    }


    // setVisibility(visible) {
    //     this.images.forEach(image => {
    //         image.setVisible(visible);
    //     });
    // }

    animateImage(index, props, duration = 1000, ease = 'Power2', loop = false, rewind = false) {
        if (this.images[index]) {
            this.scene.tweens.add({
                targets: this.images[index],
                ...props,
                duration: duration,
                ease: ease,
                loop: loop,
                yoyo: rewind, // Reverse the animation if rewind is true
                onComplete: () => {
                    // Logging the final position of the image
                    console.log(`Animation complete. Final position - x: ${this.images[index].x}, y: ${this.images[index].y}`);
                }
            });
        }
    }
    

    scaleImages(scale, index = null) {
        if (index !== null && this.images[index]) {
            this.images[index].setScale(scale);
        } else {
            this.images.forEach(image => image.setScale(scale));
        }
    }
    
}
