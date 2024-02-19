// ImageSelector.js ----------------CUSTOM CLASS----------------
// This class is used to create a set of images that can be selected by the user.
// It also provides methods to animate, scale, and position the images.
// The selected image is highlighted and wiggled.

export default class ImageSelector {
    constructor(scene, imageKeys, onSelectCallback) {
        this.scene = scene;
        this.imageKeys = imageKeys;
        this.onSelectCallback = onSelectCallback;
        this.selectedKey = null; // Using keys to identify images

        this.images = []; // Storing the images. . .

        this.createImages();
    }

    createImages() {
        const startX = 100; 
        const startY = 250; 
        const spacing = 120;
        this.imageKeys.forEach((key, index) => {
            const image = this.scene.add.image(startX + (spacing * index), startY, key).setInteractive();
            image.setScale(0.5); 
            image.on('pointerdown', () => this.selectImage(key));
            this.images.push(image);
        });
    }
    selectImage(selectedKey) {
        this.selectedKey = selectedKey;
        console.log(`Selected image: ${selectedKey}`);

        // Highlighting the selected image
        if (this.onSelectCallback) {
            this.onSelectCallback(selectedKey);
        }

        // removes tints
        this.images.forEach(image => {
            image.setTint(0xffffff); 
        });

        // This finds where the image is and applies a tint to it
        const selectedImage = this.images.find(image => image.texture.key === selectedKey);
        if (selectedImage) {
            selectedImage.setTint(0x008291); // Setting tint to dark blue. CHANGE if changing color palette

            // Wiggle wiggle wiggle wiggle. Yeah
            this.animateImage(this.images.indexOf(selectedImage), { angle: 10 }, 500, 'Sine.easeInOut', true, true);
        }
    }


    resetSelection() {
        this.selectedKey = null;
        this.images.forEach(image => {
            image.setTint(0xffffff); // To remove tint from images
        });
    }

    // Hide or unhide all images
    displayImages(visible = true) {
        this.images.forEach(image => {
            image.setVisible(visible);
        });
    }

    // Shout out to ZIM pos! 🔊🔊🔊 https://zimjs.com
    pos(positions) {
        positions.forEach((position, index) => {
            if (this.images[index] && position) {
                this.images[index].setPosition(position.x, position.y);
            }
        });
    }

    animateImage(index, props, duration = 1000, ease = 'Power2', loop = false, rewind = false) {
        if (this.images[index]) {
            this.scene.tweens.add({
                targets: this.images[index],
                ...props,
                duration: duration,
                ease: ease,
                loop: loop,
                yoyo: rewind, 
                onComplete: () => {
                    // Where the pics be in the end is the question
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
