import { Container, Texture, Sprite, Point, InteractionEvent, AnimatedSprite } from "pixi.js";
import { IntroScene } from "./IntroScene";
import { IScene, Manager } from "./Manager";
import { SceneTwo } from "./SceneTwo";

export class SceneOne extends Container implements IScene {

    private mainContainer: Container = new Container();
    private cursorFirefly: AnimatedSprite;
    private wheat: Sprite;
    private numClicks: number = 0;
    private text1: Sprite;
    private text2: Sprite;

    private rButton: Sprite = new Sprite();

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

        const sceneOneBg = Sprite.from('scene_one/Background.png');
        this.mainContainer.addChild(sceneOneBg);

        this.addRain();

        const houseGrass: Sprite = Sprite.from('scene_one/House_Grass.png');
        this.mainContainer.addChild(houseGrass);

        this.wheat = Sprite.from('scene_one/wheat.png');
        this.wheat.interactive = true;
        this.wheat.on('pointerdown', this.showJackal, this);
        this.mainContainer.addChild(this.wheat);

        const aami = Sprite.from('scene_one/Aami.png');
        aami.position.set(351, 426);
        this.mainContainer.addChild(aami);

        this.mainContainer.position.set(148, 150);

        this.mainContainer.addChild(this.cursorFirefly);
        this.mainContainer.interactive = true;
        this.mainContainer.on('pointermove', this.moveCursorFirefly, this);

        // setting up text
        this.text1 = Sprite.from('scene_one/Text1.png');
        this.text2 = Sprite.from('scene_one/Text2.png');


        this.addChild(this.mainContainer);
        this.addFrame();
        this.addButtons();
    }

    public addRain(): void {
        const rainSeq: Array<string> = ['scene_one/rain/rain-1.png', 'scene_one/rain/rain-2.png', 'scene_one/rain/rain-3.png'];
        let rainTextureSeq: Array<Texture> = [];
        for (let i = 0; i < rainSeq.length; i++) {
            let tex = Texture.from(rainSeq[i]);
            rainTextureSeq.push(tex);
        }
        const rain: AnimatedSprite = new AnimatedSprite(rainTextureSeq);
        rain.play();
        rain.animationSpeed = 0.12;
        this.mainContainer.addChild(rain);
    }

    public showJackal(_event: Event): void {
        if (this.numClicks == 0) {
            let jackal: Sprite = Sprite.from('scene_one/jackal_new.png');
            jackal.position.set(1075, 537);
            this.mainContainer.addChild(jackal);
            this.numClicks++;
            return;
        }
        if (this.numClicks == 1) {
            this.text1.position.set(80, 200);
            this.mainContainer.addChild(this.text1);
            this.numClicks++;
            return;
        }
        if (this.numClicks == 2) {
            this.mainContainer.removeChild(this.text1);
            this.text2.position.set(720, 45);
            this.mainContainer.addChild(this.text2);
            this.numClicks++;
            return;
        }
        if (this.numClicks == 3){
            this.text2.texture = Texture.from('scene_one/Text3.png');
            this.numClicks++;
            this.rButton.visible = true;
            return;
        }
    }

    public update(_delta: number): void {
        this.cursorFirefly.x += 2 * Math.random() * (Math.round(Math.random()) * 2 - 1);
        this.cursorFirefly.y += 2 * Math.random() * (Math.round(Math.random()) * 2 - 1);
    }

    public goNext(_event: Event): void {
        const nextScene: IScene = new SceneTwo;
        Manager.changeScene(nextScene);
    }

    public goPrev(_event: Event): void {
        Manager.changeScene(new IntroScene);
    }

    public moveCursorFirefly(e: InteractionEvent): void {
        let globalPos: Point = e.data.global;
        let localPos: Point = this.mainContainer.toLocal(globalPos);

        let x_off = 20;
        let y_off = 20;

        this.cursorFirefly.position.set(localPos.x - x_off, localPos.y + y_off);
    }

    public addButtons(): void {
        const rButtonDefault = Texture.from('rbutton/Forward.png');
        const rButtonHover = Texture.from('rbutton/Forward_Hover.png');
        const rButtonClicked = Texture.from('rbutton/Forward_Clicked.png');

        this.rButton.texture = rButtonDefault;
        this.rButton.position.set(1800, 960);
        
        // interactivity
        this.rButton.buttonMode = true;
        this.rButton.interactive = true;
        this.rButton.visible = false;
        this.rButton.on('pointerover', (_event) => {
            this.rButton.texture = rButtonHover;
        });
        this.rButton.on('pointerout', (_event) => {
            this.rButton.texture = rButtonDefault;
        })
        this.rButton.on('pointerdown', (_event) => {
            this.rButton.texture = rButtonClicked;
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

        this.addChild(this.rButton);
        this.addChild(lButton);
    }

    public addFrame(): void {
        const bgFrame: Sprite = Sprite.from('frame.png');
        this.addChild(bgFrame); // add frame on top of everything
    }
}