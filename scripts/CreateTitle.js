// CreateTitle.js ----------------CUSTOM CLASS----------------
// This class is used to create a title that can be manipulated.
// It also provides methods to animate, move, and update the title.
export default class CreateTitle {
    constructor(scene, text, size = '40px') {
        this.scene = scene;
        // text object to be manipulated later
        this.textObject = scene.add.text(scene.cameras.main.centerX, scene.cameras.main.centerY - 200, text, {
            fontFamily: '"Happy Monkey", "Indie Flower"',
            fontSize: size,
            color: '#ffffff'
        }).setOrigin(0.5);
    }

    // For updating the title based on context
    updateText(newText) {
        this.textObject.setText(newText);
    }

    // Let's make the title MOVE!
    moveTo(x, y, duration = 1000, ease = 'Power2') {
        this.scene.tweens.add({
            targets: this.textObject,
            x: x,
            y: y,
            duration: duration,
            ease: ease,
        });
    }

    // Let's make the title DANCE!
    animate(props, duration = 1000, ease = 'Power2') {
        this.scene.tweens.add({
            targets: this.textObject,
            ...props, // props! Shout out to ZIM!
            duration: duration,
            ease: ease,
        });
    }

    // If I need to center the text again
    centerText() {
        this.textObject.setX(this.scene.cameras.main.centerX);
        this.textObject.setY(this.scene.cameras.main.centerY - 200);
    }
}
