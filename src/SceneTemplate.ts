import { Container, Sprite } from "pixi.js";
import { IScene } from "./Manager";


export class SCENENAME extends Container implements IScene {

    constructor() {
        super();
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