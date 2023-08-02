import { Container, Texture, Sprite, AnimatedSprite, Point, InteractionEvent } from "pixi.js";
import { IScene, Manager } from "./Manager";
import { Scene12 } from "./Scene12";
import { Scene14 } from "./Scene14";


export class Scene13 extends Container implements IScene {

    private mainContainer: Container = new Container();
    private cursorFirefly: AnimatedSprite;

    private numClicks: number = 0;

    constructor() {
        super();

        let bg: Sprite = Sprite.from('scene_13/Background.png');
        bg.position.set(0, -151);
        this.mainContainer.addChild(bg);

        let glow: AnimatedSprite = AnimatedSprite.fromImages(['scene_13/glow/Scene13GoddessGlow1.png', 'scene_13/glow/Scene13GoddessGlow2.png', 'scene_13/glow/Scene13GoddessGlow3.png', 'scene_13/glow/Scene13GoddessGlow4.png'])
        glow.play();
        glow.animationSpeed = 0.05;
        glow.position.set(0, 0);
        // glow.scale.set(1.03, 1.03);
        this.mainContainer.addChild(glow);

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

        let malati: Sprite = Sprite.from('scene_13/Malati.png');
        malati.position.set(378+150, 0);
        this.addChild(malati);

        this.addButtons();
    }

    public addText(): void {
        if (this.numClicks == 0) {
            let text1: Sprite = Sprite.from('scene_13/Text1.png');
            text1.position.set(36, 319-150);
            this.mainContainer.addChild(text1);
            this.numClicks++;
            return;
        }
        if (this.numClicks == 1) {
            let text1: Sprite = Sprite.from('scene_13/Text2.png');
            text1.position.set(1145, 667-120);
            this.mainContainer.addChild(text1);
            this.numClicks++;
            return;
        }
    }

    public goNext(_event: Event): void {
        let nextScene: IScene = new Scene14;
        Manager.changeScene(nextScene);
    }

    public goPrev(_event: Event): void {
        let prevScene: IScene = new Scene12;
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