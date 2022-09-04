import { Container, Sprite } from "pixi.js";
import { IScene } from "./Manager";

export class IntroScene extends Container implements IScene {

    private mainContainer: Container = new Container();

    constructor() {
        super();

        const introBg: Sprite = Sprite.from('intro_scene/Intro.jpg');
        this.mainContainer.addChild(introBg);

        this.mainContainer.position.set(150, 150);
        this.addChild(this.mainContainer);
        this.addFrame();
    }

    public goNext(_event: Event): void {
        alert('hi');
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