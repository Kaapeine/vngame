import { Container, Sprite, Texture } from "pixi.js";
import { IScene, Manager } from "./Manager";
import { SceneOne } from "./SceneOne";
import { TitleScene } from "./TitleScene";

export class IntroScene extends Container implements IScene {

    private mainContainer: Container = new Container();

    constructor() {
        super();

        const introBg: Sprite = Sprite.from('intro_scene/Intro.jpg');
        this.mainContainer.addChild(introBg);

        this.mainContainer.position.set(150, 150);
        this.addChild(this.mainContainer);
        this.addFrame();
        this.addButtons();
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

    public goNext(_event: Event): void {
        Manager.changeScene(new SceneOne);
    }

    public goPrev(_event: Event): void {
        Manager.changeScene(new TitleScene);
    }

    public update(_delta: number): void {
        // this.leavesAngle += 0.01;
        // this.leaves.rotation = this.leavesAngle;
    }

    public addFrame(): void {
        const bgFrame: Sprite = Sprite.from('frame.png');
        this.addChild(bgFrame); // add frame on top of everything
    }
}