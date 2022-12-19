import { Container, Texture, Sprite, AnimatedSprite, Point, InteractionEvent } from "pixi.js";
import { IScene } from "./Manager";


export class Scene8 extends Container implements IScene {

    private mainContainer: Container = new Container();
    private cursorFirefly: AnimatedSprite;
    private text: Sprite = new Sprite();
    private text2: Sprite = new Sprite();
    private numClicks: number = 0;

    constructor() {
        super();

        let bg: Sprite = Sprite.from('scene_eight/Background.png');
        this.mainContainer.addChild(bg);

        let bgShift: AnimatedSprite = AnimatedSprite.fromImages(['scene_eight/bg_shift/Scene8BGShift1.png', 'scene_eight/bg_shift/Scene8BGShift2.png', 'scene_eight/bg_shift/Scene8BGShift3.png', 'scene_eight/bg_shift/Scene8BGShift4.png'])
        bgShift.play();
        bgShift.animationSpeed = 0.05;
        bgShift.position.set(0, 191);
        this.mainContainer.addChild(bgShift);

        let bgImg: Sprite = Sprite.from('scene_eight/BG.png');
        this.mainContainer.addChild(bgImg);

        let aamiGlow: Sprite = Sprite.from('scene_eight/Glow.png');
        aamiGlow.position.set(378, 495);
        this.mainContainer.addChild(aamiGlow);

        let aami: Sprite = Sprite.from('scene_eight/Aami.png');
        aami.position.set(387, 515);
        this.mainContainer.addChild(aami);

        let tigerGlow: Sprite = Sprite.from('scene_eight/Glow 2.png');
        tigerGlow.position.set(671, 634);
        this.mainContainer.addChild(tigerGlow);

        let tiger: Sprite = Sprite.from('scene_eight/Tiger.png');
        tiger.position.set(666, 648);
        this.mainContainer.addChild(tiger);

        // TEXT
        this.mainContainer.on('pointerdown', this.addText, this);
        this.text.texture = Texture.from('scene_eight/Text 1.png');
        this.text2.texture = Texture.from('scene_eight/Text 2.png');

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

        this.mainContainer.position.set(150, 150);

        this.mainContainer.addChild(this.cursorFirefly);
        this.mainContainer.interactive = true;
        this.mainContainer.on('pointermove', this.moveCursorFirefly, this);

        this.addChild(this.mainContainer);
        this.addFrame();
        this.addButtons();
    }

    public addText(): void {
        if (this.numClicks == 0) {
            this.text.position.set(103, 310);
            this.text2.position.set(986, 309);
            this.mainContainer.addChild(this.text);
            this.mainContainer.addChild(this.text2);
            this.numClicks++;
            return;
        }
        if (this.numClicks == 1) {
            this.text.texture = Texture.from('scene_eight/Text 3.png');
            this.text2.texture = Texture.from('scene_eight/Text 4.png');
            this.text2.position.set(1050, 498);
            this.numClicks++;
            return;
        }
    }

    public goNext(_event: Event): void {
        alert('hi');
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
        this.addChild(lButton);
    }

    public addFrame(): void {
        const bgFrame: Sprite = Sprite.from('frame.png');
        this.addChild(bgFrame); // add frame on top of everything
    }
}