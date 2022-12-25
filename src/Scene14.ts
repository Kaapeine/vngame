import { Container, Texture, Sprite, AnimatedSprite, Point, InteractionEvent } from "pixi.js";
import { IScene, Manager } from "./Manager";
import { Scene13 } from "./Scene13";
import { Scene15 } from "./Scene15";


export class Scene14 extends Container implements IScene {

    private mainContainer: Container = new Container();
    private cursorFirefly: AnimatedSprite;

    private text: Sprite =  new Sprite();
    private instructions: Sprite = new Sprite();

    private numClicks: number = 0;

    constructor() {
        super();

        let bg: Sprite = Sprite.from('scene_14/Background.png');
        this.mainContainer.addChild(bg);

        let stars: AnimatedSprite = AnimatedSprite.fromImages(['scene_14/Scene14Stars1.png', 'scene_14/Scene14Stars2.png']);
        stars.play();
        stars.animationSpeed = 0.05;
        this.mainContainer.addChild(stars);

        let midTree: Sprite = Sprite.from('scene_14/MidTree.png');
        midTree.position.set(238, 55);
        this.mainContainer.addChild(midTree);
        // midTree.interactive = true;

        let midFlower: AnimatedSprite = AnimatedSprite.fromImages(['scene_14/Scene14MidFlower1.png', 'scene_14/Scene14MidFlower2.png']);
        midFlower.animationSpeed = 0.05;
        midFlower.loop = false;
        midFlower.visible = false;
        this.mainContainer.addChild(midFlower);

        let leftTree: Sprite = Sprite.from('scene_14/LeftTree.png');
        leftTree.position.set(0, 3);
        // leftTree.interactive = true;
        this.mainContainer.addChild(leftTree);

        let leftFlower: AnimatedSprite = AnimatedSprite.fromImages(['scene_14/Scene14LeftFlower1.png', 'scene_14/Scene14LeftFlower2.png']);
        leftFlower.animationSpeed = 0.05;
        leftFlower.loop = false;
        leftFlower.visible = false;
        this.mainContainer.addChild(leftFlower);

        let rightTree: Sprite = Sprite.from('scene_14/RightTree.png');
        rightTree.position.set(873, 3);
        // rightTree.interactive = true;
        this.mainContainer.addChild(rightTree);

        let rightFlower: AnimatedSprite = AnimatedSprite.fromImages(['scene_14/Scene14RightFlower1.png', 'scene_14/Scene14RightFlower2.png']);
        rightFlower.animationSpeed = 0.05;
        rightFlower.loop = false;
        rightFlower.visible = false;
        this.mainContainer.addChild(rightFlower);

        midTree.on('pointerdown', () => {
            midFlower.visible = true;
            midFlower.play();
        });

        leftTree.on('pointerdown', () => {
            leftFlower.visible = true;
            leftFlower.play();

            if (this.numClicks == 1) {
                this.text.texture = Texture.from('scene_14/Text2.png');
                this.numClicks++;
                return;
            }
            if (this.numClicks == 2) {
                this.text.texture = Texture.from('scene_14/Text3.png');
                this.text.position.set(573, 100);
                this.mainContainer.removeChild(this.instructions);
                this.numClicks++;
                return;
            }
        });

        rightTree.on('pointerdown', () => {
            rightFlower.visible = true;
            rightFlower.play();

            if (this.numClicks == 1) {
                this.text.texture = Texture.from('scene_14/Text2.png');
                this.numClicks++;
                return;
            }
            if (this.numClicks == 2) {
                this.text.texture = Texture.from('scene_14/Text3.png');
                this.text.position.set(573, 100);
                this.mainContainer.removeChild(this.instructions);
                this.numClicks++;
                return;
            }
        });

        let grass: Sprite = Sprite.from('scene_14/Grass.png');
        grass.position.set(0, 725);
        this.mainContainer.addChild(grass);

        let aami: Sprite = Sprite.from('scene_14/Aami.png');
        aami.position.set(783, 531);
        this.mainContainer.addChild(aami);

        // TEXT
        this.text.texture = Texture.from('scene_14/Text1.png');
        this.text.position.set(524, 36);

        this.instructions.texture = Texture.from('scene_14/click.png');
        this.instructions.position.set(266, 717);

        this.mainContainer.on('pointerdown', () => {
            if (this.numClicks == 0) {
                this.mainContainer.addChild(this.text);
                this.mainContainer.addChild(this.instructions);
                leftTree.interactive = true;
                rightTree.interactive = true;
                midTree.interactive = true;
                this.numClicks++;
            }
        })



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

    public goNext(_event: Event): void {
        let nextScene: IScene = new Scene15;
        Manager.changeScene(nextScene);
    }

    public goPrev(_event: Event): void {
        let prevScene: IScene = new Scene13;
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