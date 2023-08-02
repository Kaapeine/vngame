import { Container, Texture, Sprite, AnimatedSprite, Point, InteractionEvent, Text, TextStyle } from "pixi.js";
import { IScene, Manager } from "./Manager";
import { TitleScene } from "./TitleScene";
import { IntroScene } from "./IntroScene";
import { SceneFive } from "./SceneFive";
import { SceneFour } from "./SceneFour";
import { SceneOne } from "./SceneOne";
import { SceneSeven } from "./SceneSeven";
import { SceneSix } from "./SceneSix";
import { SceneThree } from "./SceneThree";
import { SceneTwo } from "./SceneTwo";
import { Scene8 } from "./Scene8";
import { Scene9 } from "./Scene9";
import { Scene10 } from "./Scene10";
import { Scene11 } from "./Scene11";
import { Scene12 } from "./Scene12";
import { Scene13 } from "./Scene13";
import { Scene14 } from "./Scene14";
import { Scene15 } from "./Scene15";
import { Scene16 } from "./Scene16";
import { Scene17 } from "./Scene17";
import { EndScene } from "./EndScene";
import { Credits } from "./Credits";

export class LoadingScreen extends Container implements IScene {

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

        this.mainContainer.position.set(148, 150);

        this.mainContainer.addChild(this.cursorFirefly);
        this.mainContainer.interactive = true;
        this.mainContainer.on('pointermove', this.moveCursorFirefly, this);

        const spinner: AnimatedSprite = AnimatedSprite.fromImages(['loading/LoadingCircle.png', 'loading/LoadingCircle2.png']);
        spinner.position.set(725, 400);
        spinner.play();
        spinner.animationSpeed = 0.05;
        this.mainContainer.addChild(spinner);

        const loadingText: Sprite = Sprite.from('loading/LoadingText.png');
        loadingText.position.set(725, 300);
        this.mainContainer.addChild(loadingText);

        this.addChild(this.mainContainer);
        this.addFrame();
        this.addButtons();

        // this.loadScenes();
        window.setTimeout(function() {
            loadingText.visible = false;
            spinner.visible = false;
        }, 10000);
    }

    public loadScenes(): void {
        const _titlescreen: IScene = new TitleScene;
        const _introscene: IScene = new IntroScene;
        const _scene1: IScene = new SceneOne;
        const _scene2: IScene = new SceneTwo;
        const _scene3: IScene = new SceneThree;
        const _scene4: IScene = new SceneFour;
        const _scene5: IScene = new SceneFive;
        const _scene6: IScene = new SceneSix;
        const _scene7: IScene = new SceneSeven;
        const _scene8: IScene = new Scene8;
        const _scene9: IScene = new Scene9;
        const _scene10: IScene = new Scene10;
        const _scene11: IScene = new Scene11;
        const _scene12: IScene = new Scene12;
        const _scene13: IScene = new Scene13;
        const _scene14: IScene = new Scene14;
        const _scene15: IScene = new Scene15;
        const _scene16: IScene = new Scene16;
        const _scene17: IScene = new Scene17;
        const _endscene: IScene = new EndScene;
        const _credits: IScene = new Credits;
    }

    public goNext(_event: Event): void {
        Manager.changeScene(new TitleScene);
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
        // this.addChild(lButton);
    }

    public addFrame(): void {
        const bgFrame: Sprite = Sprite.from('frame.png');
        this.addChild(bgFrame); // add frame on top of everything
    }
}