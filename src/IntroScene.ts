import { AnimatedSprite, Container, InteractionEvent, Point, ParticleContainer, Sprite, Texture } from "pixi.js";
import { IScene, Manager } from "./Manager";
import { SceneOne } from "./SceneOne";
import { TitleScene } from "./TitleScene";

export class IntroScene extends Container implements IScene {

    private mainContainer: Container = new Container();
    private fireflyContainer: ParticleContainer = new ParticleContainer();
    private fireflyArray: Array<AnimatedSprite> = [];
    private numFireflies: number = 100;

    constructor() {
        super();

        const introBg: Sprite = Sprite.from('intro_scene/Intro.jpg');
        this.mainContainer.addChild(introBg);

        this.addFireflies();

        this.mainContainer.position.set(150, 150);
        this.addChild(this.mainContainer);
        this.addFrame();
        this.addButtons();

        this.mainContainer.interactive = true;
        this.mainContainer.on('pointermove', this.moveFireflies, this);
    }

    public addFireflies(): void {
        const fireflySeq: Array<string> = ['intro_scene/firefly/firefly-1.png', 'intro_scene/firefly/firefly-2.png', 'intro_scene/firefly/firefly-3.png', 'intro_scene/firefly/firefly-4.png', 'intro_scene/firefly/firefly-5.png'];
        let fireflyTextureSeq: Array<Texture> = [];
        for (let i = 0; i < fireflySeq.length; i++){
            // console.log(i);
            let tex = Texture.from(fireflySeq[i]);
            fireflyTextureSeq.push(tex);
        }

        for (let i  = 0; i <= this.numFireflies; ++i) {
            let firefly: AnimatedSprite = new AnimatedSprite(fireflyTextureSeq);
            let x: number = Math.random() * 1800;
            let y: number = Math.random() * 700;
            firefly.position.set(x, y);
            firefly.play();
            firefly.animationSpeed = 0.05;

            this.fireflyArray.push(firefly);
            this.fireflyContainer.addChild(firefly);
        } 

        this.mainContainer.addChild(this.fireflyContainer);
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

    public goNext(_event: Event): void {
        Manager.changeScene(new SceneOne);
    }

    public goPrev(_event: Event): void {
        Manager.changeScene(new TitleScene);
    }

    public update(_delta: number): void {
        // this.leavesAngle += 0.01;
        // this.leaves.rotation = this.leavesAngle;
        for (let i = 0; i < this.numFireflies; ++i) {
            const firefly: AnimatedSprite = this.fireflyArray[i];
            if (firefly.x >= 1850 || firefly.x == 0 || firefly.y >= 750 || firefly.y == 0) {

                // RANDOM RESPAWN
                let x: number = Math.random() * 1800;
                let y: number = Math.random() * 700;
                firefly.position.set(x, y);

                // TODO Bounce back
            }
            firefly.x += 2 * Math.random() * (Math.round(Math.random()) * 2 - 1);
            firefly.y += 2 * Math.random() * (Math.round(Math.random()) * 2 - 1);
        }        
    }

    public moveFireflies(e: InteractionEvent): void {
        let pos: Point = e.data.global;
        let localPos: Point = this.mainContainer.toLocal(pos);

        for (let i = 0; i < this.numFireflies; ++i) {
            const firefly: AnimatedSprite = this.fireflyArray[i];
            let dist = this.getDist(localPos, firefly.position);
            if (dist < 150) {
                let theta: number = this.getAngle(localPos, firefly.position);
                firefly.x += 3 * Math.cos(theta);
                firefly.y += 3 * Math.sin(theta);
            }
        }
    }

    public getDist(p1: Point, p2: Point): number {
        return Math.sqrt((p2.x - p1.x)**2 + (p2.y - p1.y)**2);
    }

    public getAngle(p1: Point, p2: Point): number {
        return Math.atan2(p2.y - p1.y, p2.x - p1.x);
    }

    public addFrame(): void {
        const bgFrame: Sprite = Sprite.from('frame.png');
        this.addChild(bgFrame); // add frame on top of everything
    }
}