import { Container, Texture, Sprite, AnimatedSprite, Point, InteractionEvent } from "pixi.js";
import { IScene, Manager } from "./Manager";
import { Scene10 } from "./Scene10";
import { Scene12 } from "./Scene12";


export class Scene11 extends Container implements IScene {

    private mainContainer: Container = new Container();
    private cursorFirefly: AnimatedSprite;

    private text: Sprite = new Sprite();
    private numClicks: number = 0;

    constructor() {
        super();

        let bg: Sprite = Sprite.from('scene_11/Background.png');
        this.mainContainer.addChild(bg);

        let glowString: AnimatedSprite = AnimatedSprite.fromImages(['scene_11/glowstring/Scene11GlowString1.png', 'scene_11/glowstring/Scene11GlowString2.png', 'scene_11/glowstring/Scene11GlowString3.png', 'scene_11/glowstring/Scene11GlowString4.png', 'scene_11/glowstring/Scene11GlowString5.png', 'scene_11/glowstring/Scene11GlowString6.png']);
        glowString.position.set(694, 319);
        glowString.play();
        glowString.animationSpeed = 0.05;
        this.mainContainer.addChild(glowString);

        // TEXT
        this.text.texture = Texture.from('scene_11/Text1.png');
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
            this.text.position.set(182, 262);
            this.mainContainer.addChild(this.text);
            this.numClicks++;
            return;
        }
        if (this.numClicks == 1) {
            this.text.position.set(926, 262);
            this.text.texture = Texture.from('scene_11/Text2.png');
            this.numClicks++;
            return;
        }
        if (this.numClicks == 2) {
            this.text.position.set(182, 262);
            this.text.texture = Texture.from('scene_11/Text3.png');
            this.numClicks++;
            return;
        }
    }

    public goNext(_event: Event): void {
        let nextScene: IScene = new Scene12;
        Manager.changeScene(nextScene);
    }

    public goPrev(_event: Event): void {
        let prevScene: IScene = new Scene10;
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