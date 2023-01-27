import { Container, Texture, Sprite, AnimatedSprite, InteractionEvent, Point } from "pixi.js";
import { IScene, Manager } from "./Manager";
import { SceneFour } from "./SceneFour";
import { SceneTwo } from "./SceneTwo";

export class SceneThree extends Container implements IScene {

    private mainContainer: Container = new Container();
    private cursorFirefly: AnimatedSprite;
    private text: Sprite;
    private numClicks: number = 0;
    private isClickedScene: boolean = false;

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

        let bgTrees: Sprite = Sprite.from('scene_three/BG_Trees.png');
        this.mainContainer.addChild(bgTrees);
        
        this.addStars();
        this.addHouses();

        this.mainContainer.position.set(148, 150);

        // text
        this.text = Sprite.from('scene_three/Text1.png');
        this.text.position.set(60, 62);
        this.mainContainer.on('pointerdown', this.addText, this);

        this.mainContainer.addChild(this.cursorFirefly);
        this.mainContainer.interactive = true;
        this.mainContainer.on('pointermove', this.moveCursorFirefly, this);

        this.addChild(this.mainContainer);
        this.addFrame();
        this.addButtons();
    }

    public addStars(): void {
        const starSeq: Array<string> = ['scene_three/stars/stars-1.png', 'scene_three/stars/stars-2.png', 'scene_three/stars/stars-3.png'];
        let starTexSeq: Array<Texture> = [];
        for (let i = 0; i < starSeq.length; i++) {
            let tex: Texture = Texture.from(starSeq[i]);
            starTexSeq.push(tex);
        }
        const stars = new AnimatedSprite(starTexSeq);
        stars.play();
        stars.animationSpeed = 0.025;
        this.mainContainer.addChild(stars);
    }

    public addHouses(): void {
        let house1: Sprite = Sprite.from('scene_three/House1Closed.png');
        let house2: Sprite = Sprite.from('scene_three/House2Closed.png');
        let house3: Sprite = Sprite.from('scene_three/House3Closed.png');

        house1.position.set(69, 515);
        house2.position.set(543, 524);
        house3.position.set(1319, 525);

        house1.interactive = true;
        house1.on('pointerover', () => {
            house1.texture = Texture.from('scene_three/House1Open.png');
        })
        house1.on('pointerout', () => {
            house1.texture = Texture.from('scene_three/House1Closed.png');
        })
        
        house2.interactive = true;
        house2.on('pointerover', () => {
            house2.texture = Texture.from('scene_three/House2Open.png');
        })
        house2.on('pointerout', () => {
            house2.texture = Texture.from('scene_three/House2Closed.png');
        })

        house3.interactive = true;
        house3.on('pointerover', () => {
            house3.position.set(1100, 525);
            house3.texture = Texture.from('scene_three/House3Open.png');
        })
        house3.on('pointerout', () => {
            house3.position.set(1319, 525);
            house3.texture = Texture.from('scene_three/House3Closed.png');
        })
        // switch to scene3_clicked
        house3.on('pointerdown', this.clickedScene, this);

        this.mainContainer.addChild(house1);
        this.mainContainer.addChild(house2);
        this.mainContainer.addChild(house3);
    }   

    public addText(): void {
        if (this.numClicks == 0 && !this.isClickedScene) {
            this.mainContainer.addChild(this.text);
            this.numClicks++;
            return;
        }
        if (this.numClicks == 1 && !this.isClickedScene) {
            this.text.texture = Texture.from('scene_three/Text2.png');
            this.numClicks++;
            return;
        }
        if (this.numClicks == 2 && !this.isClickedScene) {
            this.text.texture = Texture.from('scene_three/Text3.png');
            this.numClicks++;
            return;
        }
    }

    public clickedScene(): void {
        this.mainContainer.removeChildren(0, 3);
        this.isClickedScene = true;

        const fireflySeq: Array<string> = ['intro_scene/firefly/firefly-1.png', 'intro_scene/firefly/firefly-2.png', 'intro_scene/firefly/firefly-3.png', 'intro_scene/firefly/firefly-4.png', 'intro_scene/firefly/firefly-5.png'];
        let fireflyTextureSeq: Array<Texture> = [];
        for (let i = 0; i < fireflySeq.length; i++){
            let tex = Texture.from(fireflySeq[i]);
            fireflyTextureSeq.push(tex);
        }
        this.cursorFirefly = new AnimatedSprite(fireflyTextureSeq);

        this.cursorFirefly.play();
        this.cursorFirefly.animationSpeed = 0.05;

        this.mainContainer.addChild(this.cursorFirefly);
        this.mainContainer.on('pointermove', this.moveCursorFirefly, this);

        const background: Sprite = Sprite.from('scene_three/Background.png');
        this.mainContainer.addChild(background);

        background.interactive = true;
        background.on('pointerdown', () => {
            this.text.texture = Texture.from('scene_three/Text 1.png');
            this.text.position.set(1028, 61);
            this.mainContainer.addChild(this.text);
        })

        const aami: Sprite = Sprite.from('scene_three/Aami.png');
        aami.position.set(122, 337);
        this.mainContainer.addChild(aami);

        const glow: Sprite = Sprite.from('scene_three/FireGlow.png');
        glow.position.set(38, 167);
        this.mainContainer.addChild(glow);

        const flame: AnimatedSprite = AnimatedSprite.fromImages(['scene_three/candle/CandleFire.png', 'scene_three/candle/CandleFire-1.png', 'scene_three/candle/CandleFire-2.png', 'scene_three/candle/CandleFire-3.png']);
        flame.position.set(260, 400);
        flame.play();
        flame.animationSpeed = 0.1;
        this.mainContainer.addChild(flame);
    }

    public goNext(_event: Event): void {
        const nextScene: IScene = new SceneFour;
        Manager.changeScene(nextScene);
    }

    public goPrev(_event: Event): void {
        const prevScene: IScene = new SceneTwo;
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