export default class ButtonMakerExtraordinaire {
    constructor(scene, text, x, y, width, height, cornerRadius, onClickCallback) {
        this.scene = scene;
        this.text = text;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.cornerRadius = cornerRadius;

        // Colors
        this.normalColor = 0x00BBD1;
        this.hoverColor = 0x009DAE;

        // Create the button graphics
        this.button = this.scene.add.graphics();
        this.button.fillStyle(this.normalColor, 1);
        this.button.fillRoundedRect(0, 0, this.width, this.height, this.cornerRadius);

        // Add the text
        this.buttonText = this.scene.add.text(this.width / 2, this.height / 2, this.text, {
            fontFamily: 'Indie Flower',
            fontSize: '18px',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);

        // Create a container and add the button graphics and text to it
        this.container = this.scene.add.container(x, y, [this.button, this.buttonText]);

        // Set the size of the container to match the button for proper interaction
        this.container.setSize(width, height);
        this.container.setInteractive(new Phaser.Geom.Rectangle(0, 0, width, height), Phaser.Geom.Rectangle.Contains);

        // Setup event listeners on the container
        this.container.on('pointerdown', () => this.onClick(), this);
        this.container.on('pointerover', () => this.drawButton(this.hoverColor));
        this.container.on('pointerout', () => this.drawButton(this.normalColor));

        // Store the onClick callback
        this.onClickCallback = onClickCallback;

        // After setting up the button and text in the container
this.container.setSize(width, height); // Ensure this matches the button's visual size
this.container.setInteractive(new Phaser.Geom.Rectangle(0, 0, width, height), Phaser.Geom.Rectangle.Contains);

    }

    drawButton(color) {
        this.button.clear();
        this.button.fillStyle(color, 1);
        this.button.fillRoundedRect(0, 0, this.width, this.height, this.cornerRadius);
        this.button.strokeRect(0, 0, this.width, this.height); // for debugging
    }

    setText(text) {
        this.buttonText.setText(text);
    }

    onClick() {
        console.log(`${this.text} button clicked`);
        // Execute the onClick callback if it's a function
        if (this.onClickCallback && typeof this.onClickCallback === 'function') {
            this.onClickCallback();
        }
    }

    animateButton(x, y, duration, ease) {
        this.scene.tweens.add({
            targets: this.container, 
            x: this.container.x + x, // Relative to current position
            y: this.container.y + y,
            duration: duration,
            ease: ease
        });
    }
}
