import { Container, Texture, Sprite, AnimatedSprite, Point, InteractionEvent } from "pixi.js";
import { IScene, Manager } from "./Manager";
import { Scene8 } from "./Scene8";
import { SceneSix } from "./SceneSix";

export class SceneSeven extends Container implements IScene {

    private mainContainer: Container = new Container();
    private cursorFirefly: AnimatedSprite;
    private clearBush: Sprite;

    private text: Sprite;

    private tick: number = 0;

    private aami: Sprite;

    private layer1: Container = new Container();

    constructor() {
        super();

        let bg: Sprite = Sprite.from('scene_seven/Background.png');
        this.mainContainer.addChild(bg);

        this.addLayer2();
        this.addLayer1();

        this.aami = Sprite.from('scene_seven/Layer1Aami.png');
        this.aami.position.set(761, 376);
        this.mainContainer.addChild(this.aami);

        let grass: Sprite = Sprite.from('scene_seven/Grass.png');
        grass.position.set(0, 731);
        this.mainContainer.addChild(grass);

        // TEXT
        this.clearBush = Sprite.from('scene_seven/clearbush.png');
        this.clearBush.position.set(1223, 752);
        this.mainContainer.addChild(this.clearBush);

        this.text = Sprite.from('scene_seven/Text 1.png');
        this.text.position.set(30, 30);
        this.mainContainer.addChild(this.text);

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

    public addLayer2(): void {
        let midTree: Sprite = Sprite.from('scene_seven/Layer 13.png');
        this.layer1.addChild(midTree);

        let leftTree: Sprite = Sprite.from('scene_seven/LeftTree.png');
        this.layer1.addChild(leftTree);

        let rightTree: Sprite = Sprite.from('scene_seven/RightTree.png');
        rightTree.position.set(820, 0);
        this.layer1.addChild(rightTree);

        let leftBush: Sprite = Sprite.from('scene_seven/LeftBush.png');
        leftBush.position.set(311, 565);
        this.layer1.addChild(leftBush);

        let rightBush: Sprite = Sprite.from('scene_seven/RightBush.png');
        rightBush.position.set(953, 569);
        this.layer1.addChild(rightBush);

        rightBush.interactive = true;
        rightBush.on('pointerdown', () => {
            this.layer1.removeChild(rightBush);
            this.layer1.removeChild(rightTree);
            this.tick++;
            if (this.tick == 4) {
                this.layer1.removeChild(midTree);
                this.mainContainer.removeChild(this.clearBush);
                this.text.texture = Texture.from('scene_seven/Text 3.png');
                this.text.position.set(1070, 30);

                this.aami.texture = Texture.from('scene_seven/Layer3Aami.png');
                this.aami.position.set(786, 504);
            }
        })

        leftBush.interactive = true;
        leftBush.on('pointerdown', () => {
            this.layer1.removeChild(leftBush);
            this.layer1.removeChild(leftTree);
            this.tick++;
            if (this.tick == 4) {
                this.layer1.removeChild(midTree);
                this.mainContainer.removeChild(this.clearBush);
                this.text.texture = Texture.from('scene_seven/Text 3.png');
                this.text.position.set(1070, 30);

                this.aami.texture = Texture.from('scene_seven/Layer3Aami.png');
                this.aami.position.set(786, 504);
            }
        })

        this.mainContainer.addChild(this.layer1);
    }

    public addLayer1(): void {
        let leftTree: Sprite = Sprite.from('scene_seven/LeftTree 2.png');
        this.layer1.addChild(leftTree);

        let rightTree: Sprite = Sprite.from('scene_seven/RightTree 2.png');
        rightTree.position.set(855, 0);
        this.layer1.addChild(rightTree);

        let midTree: Sprite = Sprite.from('scene_seven/MidTree.png');
        this.layer1.addChild(midTree);

        let leftBush: Sprite = Sprite.from('scene_seven/LeftBush 2.png');
        leftBush.position.set(178, 502);
        this.layer1.addChild(leftBush);

        let rightBush: Sprite = Sprite.from('scene_seven/RightBush 2.png');
        rightBush.position.set(877, 529);
        this.layer1.addChild(rightBush);

        rightBush.interactive = true;
        rightBush.on('pointerdown', () => {
            this.layer1.removeChild(rightBush);
            this.layer1.removeChild(rightTree);
            this.tick++;
            if (this.tick == 2) {
                this.layer1.removeChild(midTree);
                this.text.texture = Texture.from('scene_seven/Text 2.png');
                this.text.position.set(549, 30);

                this.aami.texture = Texture.from('scene_seven/Layer2Aami.png');
                this.aami.position.set(741, 449);
            }
        })

        leftBush.interactive = true;
        leftBush.on('pointerdown', () => {
            this.layer1.removeChild(leftBush);
            this.layer1.removeChild(leftTree);
            this.tick++;
            if (this.tick == 2) {
                this.layer1.removeChild(midTree);
                this.text.texture = Texture.from('scene_seven/Text 2.png');
                this.text.position.set(549, 30);

                this.aami.texture = Texture.from('scene_seven/Layer2Aami.png');
                this.aami.position.set(741, 449);
            }
        })
        
        this.mainContainer.addChild(this.layer1);
    }

    public goNext(_event: Event): void {
        let nextScene: IScene = new Scene8;
        Manager.changeScene(nextScene);
    }

    public goPrev(_event: Event): void {
        let prevScene: IScene = new SceneSix;
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