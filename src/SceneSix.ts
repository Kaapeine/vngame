import gsap from 'gsap';
import { Container, Texture, Sprite, AnimatedSprite, Point, InteractionEvent } from "pixi.js";
import { IScene, Manager } from "./Manager";
import { SceneFive } from "./SceneFive";
import { SceneSeven } from "./SceneSeven";


export class SceneSix extends Container implements IScene {

    private mainContainer: Container = new Container();
    private cursorFirefly: AnimatedSprite;
    private overlay: Sprite;
    private text: Sprite;
    private numClicks: number = 0;

    private rButton: Sprite = new Sprite();


    constructor() {
        super();

        let bg: Sprite = Sprite.from('scene_six/Background.png');
        this.mainContainer.addChild(bg);

        this.overlay = Sprite.from('scene_six/Overlay with Text 1.png');
        this.mainContainer.addChild(this.overlay);

        let glow: Sprite = Sprite.from('scene_six/Glow.png');
        glow.position.set(975, 80);
        this.mainContainer.addChild(glow);

        let soul: AnimatedSprite = AnimatedSprite.fromImages(['scene_six/soul/Scene6Soul1.png', 'scene_six/soul/Scene6Soul2.png', 'scene_six/soul/Scene6Soul3.png', 'scene_six/soul/Scene6Soul4.png']);
        soul.position.set(1057, 165);
        soul.play();
        soul.animationSpeed = 0.05;
        this.mainContainer.addChild(soul);

        // TEXT
        this.text = Sprite.from('scene_six/Text 1.png');
        this.text.position.set(36, 505);
        this.mainContainer.addChild(this.text);

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
            this.numClicks++;
            gsap.to(this.overlay, {
                alpha: 0, duration: 0.2,
                onComplete: () => this.mainContainer.removeChild(this.overlay)
            });
            gsap.to(this.text, {
                alpha: 0, duration: 0.2,
                onComplete: () => {
                    this.text.texture = Texture.from('scene_six/Text2.png');
                    this.text.position.set(36, 313);
                    gsap.to(this.text, { alpha: 1, duration: 0.3 });
                }
            });
            gsap.to(this.rButton, {
                alpha: 1, duration: 0.3, delay: 0.5,
                onComplete: () => { this.rButton.interactive = true; }
            });
        }
    }

    public goNext(_event: Event): void {
        let nextScene: IScene = new SceneSeven;
        Manager.changeScene(nextScene);
    }

    public goPrev(_event: Event): void {
        let prevScene: IScene = new SceneFive;
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