import { AnimatedSprite, Container, InteractionEvent, Point, ParticleContainer, Sprite, Texture } from "pixi.js";
import { Credits } from "./Credits";
import { IScene, Manager } from "./Manager";
import { Scene17 } from "./Scene17";

export class EndScene extends Container implements IScene {

    private mainContainer: Container = new Container();
    private fireflyContainer: ParticleContainer = new ParticleContainer();
    private revFireflyContainer: ParticleContainer = new ParticleContainer();
    private fireflyArray: Array<AnimatedSprite> = [];

    private numFireflies: number = 100;

    // Define ellipse here
    private textWidth: number = 800; // a third of the frame width
    private textHeight: number = 300;

    private a1: number = this.textWidth/2; // inner x radius
    private a2: number = 1626/2;

    private b1: number = this.textHeight/2; // inner y radius
    private b2: number = 781/2;

    constructor() {
        super();

        const introBg: Sprite = Sprite.from('intro_scene/Intro.jpg');
        this.mainContainer.addChild(introBg);

        this.addTitle();

        this.addFireflies();

        this.mainContainer.position.set(150, 150);
        this.addChild(this.mainContainer);
        this.addFrame();
        this.addButtons();

        this.mainContainer.interactive = true;
        this.mainContainer.on('pointermove', this.moveFireflies, this);
    }

    public addTitle(): void {
        let end: AnimatedSprite = AnimatedSprite.fromImages(['end/TheEnd1.png', 'end/TheEnd2.png', 'end/TheEnd3.png']);
        end.play();
        end.animationSpeed = 0.05;
        end.position.set(726, 347);
        this.mainContainer.addChild(end);
    }

    public addFireflies(): void {
        const fireflyTextureSeq: Array<Texture> = [];
        const revFireflyTextureSeq: Array<Texture> = [];

        const fireflySeq: Array<string> = ['intro_scene/firefly/firefly-1.png', 'intro_scene/firefly/firefly-2.png', 'intro_scene/firefly/firefly-3.png', 'intro_scene/firefly/firefly-4.png', 'intro_scene/firefly/firefly-5.png'];
        for (let i = 0; i < fireflySeq.length; i++){
            // console.log(i);
            let tex = Texture.from(fireflySeq[i]);
            fireflyTextureSeq.push(tex);
        }

        const revFireflySeq: Array<string> = ['intro_scene/rev_firefly/RevFirefly-1.png', 'intro_scene/rev_firefly/RevFirefly-2.png', 'intro_scene/rev_firefly/RevFirefly-3.png', 'intro_scene/rev_firefly/RevFirefly-4.png', 'intro_scene/rev_firefly/RevFirefly-5.png'];
        for (let i = 0; i < revFireflySeq.length; i++){
            // console.log(i);
            let tex = Texture.from(revFireflySeq[i]);
            revFireflyTextureSeq.push(tex);
        }

        for (let i  = 0; i < this.numFireflies; ++i) {
            let rnd: number = Math.random();
            if (rnd < 0.5) {
                var firefly: AnimatedSprite = new AnimatedSprite(fireflyTextureSeq);
            }
            else {
                var firefly: AnimatedSprite = new AnimatedSprite(revFireflyTextureSeq);
            }
            let theta = rnd * Math.PI * 2;
            // let x: number = Math.random() * 1626;
            // let y: number = Math.random() * 781;
            let x: number = (this.a1 + Math.random() * (this.a2 - this.a1)) * Math.cos(theta) + 1626/2;
            let y: number = (this.b1 + Math.random() * (this.b2 - this.b1)) * Math.sin(theta) + 781/2;

            firefly.position.set(x, y);
            firefly.play();
            // TODO stagger animation
            firefly.animationSpeed = 0.05;

            this.fireflyArray.push(firefly);
            if (rnd < 0.5) {
                this.fireflyContainer.addChild(firefly);
            }
            else {
                this.revFireflyContainer.addChild(firefly);
            }
        }

        this.mainContainer.addChild(this.fireflyContainer);
        this.mainContainer.addChild(this.revFireflyContainer);
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
        Manager.changeScene(new Credits);
    }

    public goPrev(_event: Event): void {
        const prevScene: IScene = new Scene17;
        Manager.changeScene(prevScene);
    }

    public update(_delta: number): void {
        for (let i = 0; i < this.numFireflies; ++i) {
            const firefly: AnimatedSprite = this.fireflyArray[i];
            if (firefly.x >= 1626 || firefly.x <= 0 || firefly.y >= 781 || firefly.y <= 0) {

                // RANDOM RESPAWN
                let theta: number = Math.random() * Math.PI * 2;
                let x: number = (this.a1 + Math.random() * (this.a2 - this.a1)) * Math.cos(theta) + 1626/2;
                let y: number = (this.b1 + Math.random() * (this.b2 - this.b1)) * Math.sin(theta) + 781/2;
                firefly.position.set(x, y);

                // TODO Bounce
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