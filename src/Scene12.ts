import gsap from 'gsap';
import { Container, Texture, Sprite, AnimatedSprite, Point, InteractionEvent } from "pixi.js";
import { IScene, Manager } from "./Manager";
import { Scene11 } from "./Scene11";
import { Scene13 } from "./Scene13";


export class Scene12 extends Container implements IScene {

    private mainContainer: Container = new Container();
    private cursorFirefly: AnimatedSprite;

    private goddess: Sprite = new Sprite();

    private text1: Sprite = new Sprite();
    private instructions: Sprite = new Sprite();
    private numClicks: number = 0;

    private enableLake: boolean = false;

    private rButton: Sprite = new Sprite();


    constructor() {
        super();

        let bg: Sprite = Sprite.from('scene_12/Background.png');
        this.mainContainer.addChild(bg);

        let lake: Sprite = Sprite.from('scene_12/Lake.png');
        lake.position.set(0, 568);
        this.mainContainer.addChild(lake);
        lake.interactive = true;
        lake.on('pointerdown', () => {
            if (this.enableLake) {
                this.enableLake = false;
                gsap.to(lake, { alpha: 0, duration: 0.3, onComplete: () => { lake.visible = false; } });
                gsap.to(clearWater, { alpha: 1, duration: 0.3 });
                gsap.to(this.text1, {
                    alpha: 0, duration: 0.2,
                    onComplete: () => {
                        this.text1.texture = Texture.from('scene_12/Text3.png');
                        this.text1.position.set(124, 190);
                        gsap.to(this.text1, { alpha: 1, duration: 0.3 });
                    }
                });
                gsap.to(this.instructions, {
                    alpha: 0, duration: 0.2,
                    onComplete: () => {
                        this.instructions.texture = Texture.from('scene_12/Text4.png');
                        this.instructions.position.set(851, 190);
                        gsap.to(this.instructions, { alpha: 1, duration: 0.3 });
                    }
                });
                gsap.to(this.goddess, {
                    alpha: 0, duration: 0.3,
                    onComplete: () => this.mainContainer.removeChild(this.goddess)
                });
                gsap.to(this.rButton, {
                    alpha: 1, duration: 0.3, delay: 0.5,
                    onComplete: () => { this.rButton.interactive = true; }
                });
            }
        })

        let clearWater: Sprite = Sprite.from('scene_12/Clear Water (hidden).png');
        clearWater.position.set(0, 462);
        this.mainContainer.addChild(clearWater);
        clearWater.alpha = 0;

        let trees: Sprite = Sprite.from('scene_12/Trees.png');
        this.mainContainer.addChild(trees);

        let aami: Sprite = Sprite.from('scene_12/Aami.png');
        aami.position.set(562, 338);
        this.mainContainer.addChild(aami);

        this.goddess.texture = Texture.from('scene_12/Goddess.png');
        this.goddess.position.set(695, 1);
        this.mainContainer.addChild(this.goddess);

        // TEXT
        this.text1.texture = Texture.from('scene_12/Text1.png');

        this.mainContainer.on('pointerdown', this.addText, this);

        // FOOTER
        const fireflySeq: Array<string> = ['intro_scene/firefly/firefly-1.png', 'intro_scene/firefly/firefly-2.png', 'intro_scene/firefly/firefly-3.png', 'intro_scene/firefly/firefly-4.png', 'intro_scene/firefly/firefly-5.png'];
        const fireflyTextureSeq: Array<Texture> = [];
        for (let i = 0; i < fireflySeq.length; i++){
            const tex = Texture.from(fireflySeq[i]);
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
        this.addButtons();
    }

    public addText(): void {
        if (this.numClicks === 0) {
            this.text1.position.set(263, 621);
            this.text1.alpha = 0;
            this.mainContainer.addChild(this.text1);
            gsap.to(this.text1, { alpha: 1, duration: 0.3 });
            this.numClicks++;
            return;
        }
        if (this.numClicks === 1) {
            gsap.to(this.text1, {
                alpha: 0, duration: 0.2,
                onComplete: () => {
                    this.text1.texture = Texture.from('scene_12/Text2.png');
                    this.text1.position.set(265, 606);
                    gsap.to(this.text1, { alpha: 1, duration: 0.3 });
                }
            });
            this.instructions.texture = Texture.from('scene_12/click.png');
            this.instructions.position.set(1205, 547);
            this.instructions.alpha = 0;
            this.mainContainer.addChild(this.instructions);
            gsap.to(this.instructions, { alpha: 1, duration: 0.3 });
            this.enableLake = true;
            this.numClicks++;
            return;
        }
    }

    public goNext(_event: Event): void {
        let nextScene: IScene = new Scene13;
        Manager.changeScene(nextScene);
    }

    public goPrev(_event: Event): void {
        let prevScene: IScene = new Scene11;
        Manager.changeScene(prevScene);
    }

    public update(_delta: number): void {
        this.cursorFirefly.x += 2 * Math.random() * (Math.round(Math.random()) * 2 - 1);
        this.cursorFirefly.y += 2 * Math.random() * (Math.round(Math.random()) * 2 - 1);
    }

    public moveCursorFirefly(e: InteractionEvent): void {
        const globalPos: Point = e.data.global;
        const localPos: Point = this.mainContainer.toLocal(globalPos);

        const x_off = 20;
        const y_off = 20;

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
        this.rButton.interactive = false;
        this.rButton.alpha = 0;
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
}