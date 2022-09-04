import { Container, Texture, Sprite } from "pixi.js";
import { IntroScene } from "./IntroScene";
import { IScene, Manager } from "./Manager";

export class SceneOne extends Container implements IScene {

    private mainContainer: Container = new Container();
    private rain: Sprite;

    constructor() {
        super();

        const sceneOneBg = Sprite.from('scene_one/Background.png');
        this.mainContainer.addChild(sceneOneBg);

        this.rain = Sprite.from('scene_one/Rain.png');
        this.mainContainer.addChild(this.rain);

        const houseGrass = Sprite.from('scene_one/House_Grass.png');
        this.mainContainer.addChild(houseGrass);

        this.mainContainer.position.set(150, 150);

        this.addChild(this.mainContainer);
        this.addFrame();
        this.addButtons();
    }

    public goNext(_event: Event): void {
        alert('hi');
        }

    public goPrev(_event: Event): void {
        Manager.changeScene(new IntroScene);
    }

    public update(_delta: number): void {
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