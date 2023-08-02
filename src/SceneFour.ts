import { Container, Texture, Sprite, AnimatedSprite, Point, InteractionEvent } from "pixi.js";
import { dragSprite } from "./lib";
import { IScene, Manager } from "./Manager";
import { SceneFive } from "./SceneFive";
import { SceneThree } from "./SceneThree";
// import { checkCollision } from "./lib";

export class SceneFour extends Container implements IScene {

    private mainContainer: Container = new Container();
    private cursorFirefly: AnimatedSprite;
    private numClicks: number = 0;
    private text: Sprite;
    private ingreds: Boolean = false;
    private meal: Sprite;

    private rButton: Sprite = new Sprite();


    constructor() {
        super();

        let bg: Sprite = Sprite.from('scene_four/Background.png');
        this.mainContainer.addChild(bg);

        this.addIngredients();

        let fire: AnimatedSprite = AnimatedSprite.fromImages(['scene_four/fire/KitchenFire-2.png', 'scene_four/fire/KitchenFire-3.png', 'scene_four/fire/KitchenFire-1.png']);
        fire.position.set(299, 590);
        fire.play();
        fire.animationSpeed = 0.05;
        this.mainContainer.addChild(fire);

        this.meal = Sprite.from('scene_four/Meal.png');
        this.meal.position.set(672, 256);

        // TEXT
        this.mainContainer.on('pointerdown', this.showText, this);
        this.text = Sprite.from('scene_four/Text 1.png');

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

    public showText(): void {
        if (this.numClicks == 0) {
            this.text.position.set(737, 37);
            this.mainContainer.addChild(this.text);
            this.numClicks++;
            return;
        }
        if (this.numClicks == 1) {
            this.text.texture = Texture.from('scene_four/Text 2.png');
            this.text.position.set(787, 37);
            this.numClicks++;
            return;
        }
        if (this.numClicks == 2) {
            this.text.texture = Texture.from('scene_four/DRAG INGRIDIENTS INTO THE POT.png');
            this.text.position.set(1279, 735);
            this.numClicks++;
            this.ingreds = true;
            return;
        }
    }

    public addIngredients(): void {
        let pot: Sprite = Sprite.from('scene_four/pot.png');
        pot.position.set(285, 505);
        this.mainContainer.addChild(pot);
        pot.visible = false;

        let spice: dragSprite = new dragSprite('scene_four/Spice.png', this.mainContainer, pot);
        spice.sprite.position.set(576, 638);
        this.mainContainer.addChild(spice.sprite);

        let coconutmilk: dragSprite = new dragSprite('scene_four/Coconut Milk.png', this.mainContainer, pot);
        coconutmilk.sprite.position.set(703, 588);
        this.mainContainer.addChild(coconutmilk.sprite);

        let dryfruit: dragSprite = new dragSprite('scene_four/Dry Fruits.png', this.mainContainer, pot);
        dryfruit.sprite.position.set(785, 665);
        this.mainContainer.addChild(dryfruit.sprite);

        let rice: dragSprite = new dragSprite('scene_four/Rice.png', this.mainContainer, pot);
        rice.sprite.position.set(880, 609);
        this.mainContainer.addChild(rice.sprite);

        let honey: dragSprite = new dragSprite('scene_four/Honey.png', this.mainContainer, pot);
        honey.sprite.position.set(1035, 644);
        this.mainContainer.addChild(honey.sprite);
    }

    public goNext(_event: Event): void {
        let nextScene: IScene = new SceneFive;
        Manager.changeScene(nextScene);
    }

    public goPrev(_event: Event): void {
        let prevScene: IScene = new SceneThree;
        Manager.changeScene(prevScene);
    }

    public update(_delta: number): void {
        this.cursorFirefly.x += 2 * Math.random() * (Math.round(Math.random()) * 2 - 1);
        this.cursorFirefly.y += 2 * Math.random() * (Math.round(Math.random()) * 2 - 1);
        console.log(this.mainContainer.children.length);
        if (this.ingreds && this.mainContainer.children.length == 9) {
            let smoke: AnimatedSprite = AnimatedSprite.fromImages(['scene_four/smoke/KitchenSmoke-1.png', 'scene_four/smoke/KitchenSmoke-2.png', 'scene_four/smoke/KitchenSmoke-3.png', 'scene_four/smoke/KitchenSmoke-4.png']);
            smoke.position.set(301, 438);
            smoke.play();
            smoke.animationSpeed = 0.05;
            this.mainContainer.addChild(smoke);
            this.ingreds = false;
        }

        if (this.mainContainer.children.length == 6) {
            this.mainContainer.addChild(this.meal);
            this.rButton.visible = true;
        }

    }

    public moveCursorFirefly(e: InteractionEvent): void {
        let globalPos: Point = e.data.global;
        let localPos: Point = this.mainContainer.toLocal(globalPos);

        let x_off = 20;
        let y_off = 20;

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
        this.rButton.interactive = true;
        this.rButton.visible = false;
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

    public addFrame(): void {
        const bgFrame: Sprite = Sprite.from('frame.png');
        this.addChild(bgFrame); // add frame on top of everything
    }
}