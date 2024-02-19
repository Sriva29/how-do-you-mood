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

        // Creating the button
        this.button = this.scene.add.graphics();
        this.button.fillStyle(this.normalColor, 1);
        this.button.fillRoundedRect(0, 0, this.width, this.height, this.cornerRadius);

        // Adding text
        this.buttonText = this.scene.add.text(this.width / 2, this.height / 2, this.text, {
            fontFamily: 'Indie Flower',
            fontSize: '18px',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);

        // Adding both to a container
        this.container = this.scene.add.container(x, y, [this.button, this.buttonText]);

        // Setting the size of the container to match the button
        this.container.setSize(width, height);
        this.container.setInteractive(new Phaser.Geom.Rectangle(0, 0, width, height), Phaser.Geom.Rectangle.Contains);

        // Setting up event listeners on the container
        this.container.on('pointerdown', () => this.onClick(), this);
        this.container.on('pointerover', () => this.drawButton(this.hoverColor));
        this.container.on('pointerout', () => this.drawButton(this.normalColor));
        this.onClickCallback = onClickCallback;

        this.container.setSize(width, height); 
        this.container.setInteractive(new Phaser.Geom.Rectangle(0, 0, width, height), Phaser.Geom.Rectangle.Contains);

    }

    drawButton(color) {
        this.button.clear();
        this.button.fillStyle(color, 1);
        this.button.fillRoundedRect(0, 0, this.width, this.height, this.cornerRadius);
        // this.button.strokeRect(0, 0, this.width, this.height); // for debugging
    }

    setText(text) {
        this.buttonText.setText(text);
    }

    onClick() {
        console.log(`${this.text} button clicked`);
        if (this.onClickCallback && typeof this.onClickCallback === 'function') {
            this.onClickCallback();
        }
    }

    animateButton(x, y, duration, ease) {
        this.scene.tweens.add({
            targets: this.container, 
            x: this.container.x + x, 
            y: this.container.y + y,
            duration: duration,
            ease: ease
        });
    }

    clear() {
        this.container.destroy();
    }
}
