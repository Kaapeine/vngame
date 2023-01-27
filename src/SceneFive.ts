import { Container, Texture, Sprite, AnimatedSprite, Point, InteractionEvent } from "pixi.js";
import { IScene, Manager } from "./Manager";
import { SceneFour } from "./SceneFour";
import { SceneSix } from "./SceneSix";


export class SceneFive extends Container implements IScene {

    private mainContainer: Container = new Container();
    private cursorFirefly: AnimatedSprite;
    private text: Sprite;
    private ojackal: Sprite;
    private callJackal: Sprite;
    private numClicks: number = 0;

    constructor() {
        super();

        let bg: Sprite = Sprite.from('scene_five/Background.png');
        this.mainContainer.addChild(bg);

        let grass: Sprite = Sprite.from('scene_five/Grass.png');
        grass.position.set(0, 655);
        this.mainContainer.addChild(grass);
        
        let aami: Sprite = Sprite.from('scene_five/Aami and Plate.png');
        aami.position.set(180, 350);
        this.mainContainer.addChild(aami);

        this.addJackal();

        // TEXT
        this.callJackal = Sprite.from('scene_five/CLICK ON THE JACKAL TO CALL HIM.png');
        this.callJackal.position.set(1253, 735);
        this.mainContainer.addChild(this.callJackal);

        this.text = Sprite.from('scene_five/Text 1.png');
        this.ojackal = Sprite.from('scene_five/ojackal.png');

        this.text.position.set(943, 321);
        this.mainContainer.addChild(this.text);

        this.ojackal.position.set(946, 397);
        this.mainContainer.addChild(this.ojackal);

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

    public addJackal(): void {
        let jackal: Sprite = Sprite.from('scene_five/Jackal1.png');
        jackal.position.set(1399, 512);
        this.mainContainer.addChild(jackal);
        jackal.interactive = true;

        jackal.on('pointerdown', () => {
            if (this.numClicks == 0) {
                jackal.texture = Texture.from('scene_five/Jackal2.png');
                jackal.position.set(908, 556);

                this.mainContainer.removeChild(this.ojackal);

                this.text.texture = Texture.from('scene_five/Text 2.png');
                this.text.position.set(943, 320);

                this.callJackal.texture = Texture.from('scene_five/CLICK AGAIN!.png');
                this.callJackal.position.set(1468, 735);

                this.numClicks++;
            }
            else if (this.numClicks == 1) {
                jackal.texture = Texture.from('scene_five/Jackal3.png');
                jackal.position.set(448, 549);

                this.mainContainer.removeChild(this.callJackal);

                this.text.texture = Texture.from('scene_five/Text 3.png');
                this.text.position.set(943, 319);
                
                this.numClicks++;
            }
        })
    }

    public goNext(_event: Event): void {
        let nextScene: IScene = new SceneSix;
        Manager.changeScene(nextScene);
    }

    public goPrev(_event: Event): void {
        let prevScene: IScene = new SceneFour;
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