import { Container, Texture, Sprite, AnimatedSprite, Point, InteractionEvent } from "pixi.js";
import { EndScene } from "./EndScene";
import { IScene, Manager } from "./Manager";
import { Scene16 } from "./Scene16";


export class Scene17 extends Container implements IScene {

    private mainContainer: Container = new Container();
    private cursorFirefly: AnimatedSprite;

    private jackal: Sprite = new Sprite();

    private text: Sprite = new Sprite();
    private numClicks: number = 0;

    private rButton: Sprite = new Sprite();


    constructor() {
        super();

        let bg: Sprite = Sprite.from('scene_17/Background.png');
        this.mainContainer.addChild(bg);

        this.addRain();

        let wheat: Sprite = Sprite.from('scene_17/Layer 6.png');
        wheat.position.set(0, 557);
        this.mainContainer.addChild(wheat);


        this.jackal.texture = Texture.from('scene_17/Jackal1.png');
        this.jackal.position.set(687, 574);
        this.mainContainer.addChild(this.jackal);

        let aami: Sprite = Sprite.from('scene_17/Aami.png');
        aami.position.set(838, 578);
        this.mainContainer.addChild(aami);


        let ground: Sprite = Sprite.from('scene_17/Ground.png');
        ground.position.set(0, 694);
        this.mainContainer.addChild(ground);

        // TEXT
        this.mainContainer.on('pointerdown', this.addText, this);

        // FOOTER
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

        this.addChild(this.mainContainer);
        this.addFrame();
        this.addButtons();
    }

    public addText(): void {
        if (this.numClicks == 0) {
            this.text.texture = Texture.from('scene_17/Text1.png');
            this.text.position.set(535, 278);
            this.mainContainer.addChild(this.text);
            this.numClicks++;
            return;
        }
        if (this.numClicks == 1) {
            this.text.texture = Texture.from('scene_17/Text2.png');
            this.text.position.set(535, 278);
            this.numClicks++;
            return;
        }
        if (this.numClicks == 2) {
            this.text.texture = Texture.from('scene_17/Text3.png');
            this.text.position.set(508, 277);

            this.jackal.texture = Texture.from('scene_17/Jackal2.png');
            this.jackal.position.set(662, 652);

            this.numClicks++;
            this.rButton.visible = true;
            return;
        }
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

    public goNext(_event: Event): void {
        const nextScene: IScene = new EndScene;
        Manager.changeScene(nextScene);
    }

    public goPrev(_event: Event): void {
        const prevScene: IScene = new Scene16;
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