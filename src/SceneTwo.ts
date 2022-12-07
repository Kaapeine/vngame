import { Container, Texture, Sprite, AnimatedSprite, Point, InteractionEvent } from "pixi.js";
import { IScene } from "./Manager";


export class SceneTwo extends Container implements IScene {

    private mainContainer: Container = new Container();
    private cursorFirefly: AnimatedSprite;

    constructor() {
        super();

        const fireflySeq: Array<string> = ['intro_scene/firefly/firefly-1.png', 'intro_scene/firefly/firefly-2.png', 'intro_scene/firefly/firefly-3.png', 'intro_scene/firefly/firefly-4.png', 'intro_scene/firefly/firefly-5.png'];
        let fireflyTextureSeq: Array<Texture> = [];
        for (let i = 0; i < fireflySeq.length; i++){
            let tex = Texture.from(fireflySeq[i]);
            fireflyTextureSeq.push(tex);
        }
        this.cursorFirefly = new AnimatedSprite(fireflyTextureSeq);
        this.cursorFirefly.play();
        this.cursorFirefly.animationSpeed = 0.05;

        this.mainContainer.position.set(150, 150);

        this.mainContainer.addChild(this.cursorFirefly);
        this.mainContainer.interactive = true;
        this.mainContainer.on('pointermove', this.moveCursorFirefly, this);

        this.addChild(this.mainContainer);
        this.addFrame();
        this.addButtons();
    }

    public goNext(_event: Event): void {
        alert('hi');
        }

    public goPrev(_event: Event): void {
        alert('hi');
    }

    public update(_delta: number): void {
        this.cursorFirefly.x += 2 * Math.random() * (Math.round(Math.random()) * 2 - 1);
        this.cursorFirefly.y += 2 * Math.random() * (Math.round(Math.random()) * 2 - 1);
    }

    public moveCursorFirefly(e: InteractionEvent): void {
        let globalPos: Point = e.data.global;
        let localPos: Point = this.mainContainer.toLocal(globalPos);

        let x_off = 20;
        let y_off = 20;

        this.cursorFirefly.position.set(localPos.x - x_off, localPos.y + y_off);
    }

    public addButtons(): void {
        const rButton = new Sprite();
        const rButtonDefault = Texture.from('rbutton/Forward.png');
        const rButtonHover = Texture.from('rbutton/Forward_Hover.png');
        const rButtonClicked = Texture.from('rbutton/Forward_Clicked.png');

        rButton.texture = rButtonDefault;
        rButton.position.set(1800, 960);
        
        // interactivity
        rButton.buttonMode = true;
        rButton.interactive = true;
        rButton.on('pointerover', (_event) => {
            rButton.texture = rButtonHover;
        });
        rButton.on('pointerout', (_event) => {
            rButton.texture = rButtonDefault;
        })
        rButton.on('pointerdown', (_event) => {
            rButton.texture = rButtonClicked;
            this.goNext(_event);
        });

        const lButton = new Sprite();
        const lButtonDefault = Texture.from('lbutton/Back.png');
        const lButtonHover = Texture.from('lbutton/Back_Hover.png');
        const lButtonClicked = Texture.from('lbutton/Back_Clicked.png');

        lButton.texture = lButtonDefault;
        lButton.position.set(50, 960);
        
        // interactivity
        lButton.buttonMode = true;
        lButton.interactive = true;
        lButton.on('pointerover', (_event) => {
            lButton.texture = lButtonHover;
        });
        lButton.on('pointerout', (_event) => {
            lButton.texture = lButtonDefault;
        })
        lButton.on('pointerdown', (_event) => {
            lButton.texture = lButtonClicked;
            this.goPrev(_event);
        });

        this.addChild(rButton);
        this.addChild(lButton);
    }

    public addFrame(): void {
        const bgFrame: Sprite = Sprite.from('frame.png');
        this.addChild(bgFrame); // add frame on top of everything
    }
}