import { Container, Texture, Sprite, AnimatedSprite, Point, InteractionEvent } from "pixi.js";
import { IScene, Manager } from "./Manager";
import { SceneOne } from "./SceneOne";
import { SceneThree } from "./SceneThree";


export class SceneTwo extends Container implements IScene {

    private mainContainer: Container = new Container();
    private cursorFirefly: AnimatedSprite;
    private text1: Sprite;
    private text2: Sprite;
    private numClicks: number = 0;

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

        const background: Sprite = Sprite.from('scene_two/Background.png');
        this.mainContainer.addChild(background);

        this.addRain();

        const grass: Sprite = Sprite.from('scene_two/Grass.png');
        grass.position.set(0, 580);
        this.mainContainer.addChild(grass);

        const pillars: Sprite = Sprite.from('scene_two/Pillars.png');
        pillars.position.set(38, 0);
        this.mainContainer.addChild(pillars);

        const aami: Sprite = Sprite.from('scene_two/Aami.png');
        aami.position.set(253, 399);
        this.mainContainer.addChild(aami);

        const jackal: Sprite = Sprite.from('scene_two/Jackal.png');
        jackal.position.set(533, 425);
        this.mainContainer.addChild(jackal);

        this.text1 = Sprite.from('scene_two/Text_1.png');
        this.text2 = Sprite.from('scene_two/Text2.png');

        // FOOTER
        this.mainContainer.position.set(148, 150);

        this.mainContainer.addChild(this.cursorFirefly);
        this.mainContainer.interactive = true;
        this.mainContainer.on('pointerdown', this.showText, this);
        this.mainContainer.on('pointermove', this.moveCursorFirefly, this);

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

    public showText(): void {
        if (this.numClicks == 0) {
            this.text1.position.set(640, 36);
            this.mainContainer.addChild(this.text1);
            this.numClicks++;
            return;
        }
        if (this.numClicks == 1) {
            this.mainContainer.removeChild(this.text1);
            this.text2.position.set(640, 36);
            this.mainContainer.addChild(this.text2);
            this.numClicks++;
            this.rButton.visible = true;
            return;
        }
    }

    public goNext(_event: Event): void {
        const nextScene: IScene = new SceneThree;
        Manager.changeScene(nextScene);
    }

    public goPrev(_event: Event): void {
        const prevScene: IScene = new SceneOne;
        Manager.changeScene(prevScene);
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