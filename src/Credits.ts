import gsap from 'gsap';
import { Container, Texture, Sprite, AnimatedSprite, Point, InteractionEvent } from "pixi.js";
import { EndScene } from "./EndScene";
import { IScene, Manager } from "./Manager";


export class Credits extends Container implements IScene {

    private mainContainer: Container = new Container();
    private cursorFirefly: AnimatedSprite;

    private numClicks: number = 0;

    constructor() {
        super();

        let bg: Sprite = Sprite.from('credits/Background.png');
        this.mainContainer.addChild(bg);

        let layer1: Sprite = Sprite.from('credits/Text2 copy 3.png');
        let layer2: Sprite = Sprite.from('credits/Text2 copy 4.png');
        let layer3: Sprite = Sprite.from('credits/Text2 copy 5.png');

        layer1.position.set(696, 256);
        this.mainContainer.addChild(layer1);

        this.mainContainer.on('pointerdown', () => {
            if (this.numClicks === 0) {
                this.numClicks++;
                gsap.to(layer1, {
                    alpha: 0, duration: 0.2,
                    onComplete: () => {
                        this.mainContainer.removeChild(layer1);
                        layer2.position.set(725, 342);
                        layer2.alpha = 0;
                        this.mainContainer.addChild(layer2);
                        gsap.to(layer2, { alpha: 1, duration: 0.3 });
                    }
                });
                return;
            }
            if (this.numClicks === 1) {
                this.numClicks++;
                gsap.to(layer2, {
                    alpha: 0, duration: 0.2,
                    onComplete: () => {
                        this.mainContainer.removeChild(layer2);
                        layer3.position.set(695, 266);
                        layer3.alpha = 0;
                        this.mainContainer.addChild(layer3);
                        gsap.to(layer3, { alpha: 1, duration: 0.3 });
                    }
                });
                return;
            }
        })


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

    public goNext(_event: Event): void {
    }

    public goPrev(_event: Event): void {
        const prevScene: IScene = new EndScene;
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
        // const rButton = new Sprite();
        // const rButtonDefault = Texture.from('rbutton/Forward.png');
        // const rButtonHover = Texture.from('rbutton/Forward_Hover.png');
        // const rButtonClicked = Texture.from('rbutton/Forward_Clicked.png');

        // rButton.texture = rButtonDefault;
        // rButton.position.set(1800, 960);
        
        // interactivity
        // rButton.buttonMode = true;
        // rButton.interactive = true;
        // rButton.on('pointerover', (_event) => {
        //     rButton.texture = rButtonHover;
        // });
        // rButton.on('pointerout', (_event) => {
        //     rButton.texture = rButtonDefault;
        // })
        // rButton.on('pointerdown', (_event) => {
        //     rButton.texture = rButtonClicked;
        //     this.goNext(_event);
        // });

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

        // this.addChild(rButton);
        this.addChild(lButton);
    }
}