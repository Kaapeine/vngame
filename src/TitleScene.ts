import { AnimatedSprite, Texture, Container, Point, Sprite} from "pixi.js";
import { IntroScene } from "./IntroScene";
import { IScene, Manager } from "./Manager";

export class TitleScene extends Container implements IScene {

    // for making our loader graphics...
    private titleContainer: Container = new Container();
    private leaves: Sprite;
    // private leavesAngle: number = 0;
    
    constructor() {
        super();

        const titleBg: Sprite = Sprite.from('title_screen/BG.png');
        this.titleContainer.addChild(titleBg);

        this.leaves = Sprite.from('title_screen/Leaves.png');
        this.titleContainer.addChild(this.leaves);

        const topBg: Sprite = Sprite.from('title_screen/Front.png');
        this.titleContainer.addChild(topBg);

        // move titleContainer to frame bounds
        this.titleContainer.position.x = 150;
        this.titleContainer.position.y = 150;
    
        this.addChild(this.titleContainer);

        this.addHeart();
        this.addFrame();
    }

    public addHeart(): void {
        const heartSequence: Array<string> = ["title_screen/heart/1.png", "title_screen/heart/2.png", "title_screen/heart/3.png", "title_screen/heart/4.png"];
        let heartTextureSequence: Array<Texture> = [];
        for (let i = 0; i < heartSequence.length; i++){
            // console.log(i);
            let tex = Texture.from(heartSequence[i]);
            heartTextureSequence.push(tex);
        }
        console.log("Size: ", heartTextureSequence.length);
        const heart: AnimatedSprite = new AnimatedSprite(heartTextureSequence);

        let globalPos: Point = new Point(1110, 490);
        let localPos: Point = this.titleContainer.toLocal(globalPos);
        heart.position.set(localPos.x, localPos.y);

        heart.play();
        heart.animationSpeed = 0.1;

        heart.interactive = true;
        heart.on('pointerdown', (_event) => this.goNext(_event));
        
        this.titleContainer.addChild(heart);
    }

    public goNext(_event: Event): void {
        Manager.changeScene(new IntroScene);
    }

    public goPrev(_event: Event): void {
        alert('hi');
    }

    public update(_delta: number): void {
        // this.leavesAngle += 0.01;
        // this.leaves.rotation = this.leavesAngle;
    }

    public addFrame(): void {
        const bgFrame: Sprite = Sprite.from('frame.png');
        this.addChild(bgFrame); // add frame on top of everything
    }
}
