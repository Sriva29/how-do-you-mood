class ButtonMakerExtraordinaire {
    constructor(app, text, x, y, width, height, cornerRadius) {
        // Setting up the params
        this.app = app;
        this.text = text;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.cornerRadius = cornerRadius;
        
        // Hardcoding the button colors for now. Might change this to input parameters later...
        this.normalColor = 0x00BBD1; 
        this.hoverColor = 0x009DAE; 

        this.button = new PIXI.Graphics();
        this.buttonText = new PIXI.Text(text, {
            fontFamily: 'Indie Flower', // Change to parameter later
            fontSize: 18, // Change to parameter later
            fill: 0xffffff, // Change to parameter later
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

    // -------------------Click event handler. Also using GSAP for a little animation-------------------
    onClick() {
        console.log(`${this.text} button clicked`);
        gsap.to(this.button.scale, { x: 0.9, y: 0.9, duration: 0.1, yoyo: true, repeat: 1 });
    }
}

export default ButtonMakerExtraordinaire;