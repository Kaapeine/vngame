import { Container, Sprite } from "pixi.js";
import { IScene } from "./Manager";

export class TitleScene extends Container implements IScene {

    // for making our loader graphics...
    private titleContainer: Container;
    private leaves: Sprite;
    // private leavesAngle: number = 0;
    
    constructor() {
        super();

        this.titleContainer = new Container();

        const titleBg: Sprite = Sprite.from('title_screen/BG.png');
        this.titleContainer.addChild(titleBg);

        this.leaves = Sprite.from('title_screen/Leaves.png');
        this.titleContainer.addChild(this.leaves);
        this.leaves.pivot.set(this.leaves.width/2, this.leaves.height/2);

        const topBg: Sprite = Sprite.from('title_screen/Front.png');
        this.titleContainer.addChild(topBg);
        
        this.titleContainer.position.x = 150;
        this.titleContainer.position.y = 150;
    
        this.addChild(this.titleContainer);
        this.addFrame();
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
