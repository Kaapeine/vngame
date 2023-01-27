import { Container, Texture, Sprite, AnimatedSprite, Point, InteractionEvent } from "pixi.js";
import { IScene, Manager } from "./Manager";
import { Scene10 } from "./Scene10";
import { Scene8 } from "./Scene8";


export class Scene9 extends Container implements IScene {

    private mainContainer: Container = new Container();
    private cursorFirefly: AnimatedSprite;

    private text: Sprite = new Sprite();
    private hover: Sprite = new Sprite();

    private numClicks: number = 0;

    private tiger: Sprite = new Sprite();


    constructor() {
        super();

        let bg: Sprite = Sprite.from('scene_9/Background.png');
        this.mainContainer.addChild(bg);

        let aami: Sprite = Sprite.from('scene_9/Aami.png');
        aami.position.set(614, 38);
        this.mainContainer.addChild(aami);

        this.tiger.texture = Texture.from('scene_9/Weak.png');
        this.tiger.position.set(615, 5);
        this.mainContainer.addChild(this.tiger);

        // HERBS
        let kalmegh: Sprite = Sprite.from('scene_9/Kalmegh.png');
        kalmegh.position.set(1106, 660);
        this.mainContainer.addChild(kalmegh);
        kalmegh.interactive = true;
        kalmegh.on('pointerover', () => {
            kalmegh.texture = Texture.from('scene_9/Kalmegh Hovered.png');
            kalmegh.position.set(1013, 533);
        })
        kalmegh.on('pointerout', () => {
            kalmegh.texture = Texture.from('scene_9/Kalmegh.png');
            kalmegh.position.set(1106, 660);
        })

        let titaphul: Sprite = Sprite.from('scene_9/Titaphul.png');
        titaphul.position.set(1176, 595);
        this.mainContainer.addChild(titaphul);
        titaphul.interactive = true;
        titaphul.on('pointerover', () => {
            titaphul.texture = Texture.from('scene_9/Titaphul hovered.png');
            titaphul.position.set(1154, 458);
        })
        titaphul.on('pointerout', () => {
            titaphul.texture = Texture.from('scene_9/Titaphul.png');
            titaphul.position.set(1176, 595);
        })

        let nonatenga: Sprite = Sprite.from('scene_9/Nona tenga.png');
        nonatenga.position.set(1365, 665);
        this.mainContainer.addChild(nonatenga);
        nonatenga.interactive = true;
        nonatenga.on('pointerover', () => {
            nonatenga.texture = Texture.from('scene_9/Noga tenga Hovered.png');
            nonatenga.position.set(1304, 542);
        })
        nonatenga.on('pointerout', () => {
            nonatenga.texture = Texture.from('scene_9/Nona tenga.png');
            nonatenga.position.set(1365, 665);
        })


        // TEXT
        this.text.texture = Texture.from('scene_9/Text 1.png');
        this.hover.texture = Texture.from('scene_9/hover.png');
        this.mainContainer.on('pointerdown', this.addText, this);
        this.addText();


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
            this.text.position.set(36, 98);
            this.hover.position.set(36, 732);
            this.mainContainer.addChild(this.text);
            this.mainContainer.addChild(this.hover);
            this.numClicks++;
            return;
        }
        if (this.numClicks == 1) {
            this.mainContainer.removeChild(this.hover);
            this.text.texture = Texture.from('scene_9/Text 2.png');
            this.text.position.set(36, 99);

            this.tiger.texture = Texture.from('scene_9/Strong.png');
            this.tiger.position.set(920, 5);

            this.numClicks++;
            return;
        }
    }

    public goNext(_event: Event): void {
        let nextScene: IScene = new Scene10;
        Manager.changeScene(nextScene);
    }

    public goPrev(_event: Event): void {
        let prevScene: IScene = new Scene8;
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