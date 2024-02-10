class ButtonMakerExtraordinaire {
    constructor(app, text, x, y, width, height, cornerRadius) {
        this.app = app; // PIXI.Application instance
        this.text = text;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.cornerRadius = cornerRadius;
        this.normalColor = 0x00BBD1; // Teal Green
        this.hoverColor = 0x009DAE; // Darker Teal Green
        this.button = new PIXI.Graphics();
        this.buttonText = new PIXI.Text(text, {
            fontFamily: 'Indie Flower',
            fontSize: 18,
            fill: 0xffffff, // White
            align: 'center'
        });

        this.drawButton(this.normalColor);
        this.setupInteractivity();
        this.positionText();
        this.app.stage.addChild(this.button);
    }

    drawButton(color) {
        this.button.clear();
        this.button.beginFill(color);
        this.button.drawRoundedRect(0, 0, this.width, this.height, this.cornerRadius);
        this.button.endFill();
        this.button.x = this.x;
        this.button.y = this.y;
    }

    setupInteractivity() {
        this.button.interactive = true;
        this.button.buttonMode = true;
        this.button.cursor = 'pointer';
        this.button.on('pointerover', () => this.drawButton(this.hoverColor));
        this.button.on('pointerout', () => this.drawButton(this.normalColor));
        this.button.on('pointerdown', () => this.onClick());
    }

    positionText() {
        this.buttonText.x = (this.width - this.buttonText.width) / 2;
        this.buttonText.y = (this.height - this.buttonText.height) / 2;
        this.button.addChild(this.buttonText);
    }

    onClick() {
        console.log(`${this.text} button clicked`);
        // Implement additional click behavior here
    }
}
