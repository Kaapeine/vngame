import gsap from 'gsap';
import { Application } from "@pixi/app";
import { DisplayObject } from "@pixi/display";
import { Sound } from "@pixi/sound";
import { Sprite } from "pixi.js";

export class Manager {
    private constructor() {}

    public static app: Application;
    private static currentScene: IScene;
    private static persistentFrame: Sprite;
    private static introOverlay: Sprite;

    private static _width: number;
    private static _height: number;

    public static loop1: Sound = Sound.from({
        url: 'Music/girlstory_loop1.mp3',
        volume: 0.4
    });
    public static loop2: Sound = Sound.from({
        url: 'Music/aamistory_loop2.mp3',
        volume: 0.4
    });

    public static get width(): number {
        return Manager._width;
    }
    public static get height(): number {
        return Manager._height;
    }

    public static initialize(width: number, height: number, background: number): void {
        Manager._width = width;
        Manager._height = height;

        Manager.app = new Application({
            view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            backgroundColor: background,
            width: width,
            height: height
        });

        window.addEventListener("resize", Manager.resize);
        Manager.resize();
        Manager.app.ticker.add(Manager.update);

        Manager.loop1.loop = true;
        Manager.loop2.loop = true;
    }

    // Call after preloading loading-screen assets so sprites use cached textures immediately
    public static initStage(): void {
        // Persistent frame — sits at the bottom; scene content (148,150 offset) doesn't cover the borders
        Manager.persistentFrame = Sprite.from('frame.png');
        Manager.app.stage.addChild(Manager.persistentFrame);

        // Intro.jpg overlay — sits above scene and frame during transitions, alpha=0 at rest
        Manager.introOverlay = Sprite.from('intro_scene/Intro.jpg');
        Manager.introOverlay.position.set(148, 150);
        Manager.introOverlay.alpha = 0;
        Manager.app.stage.addChild(Manager.introOverlay);
    }

    public static resize(): void {
        const screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        const screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

        const scale = Math.min(screenWidth / Manager.width, screenHeight / Manager.height);
        const scaledW = Math.floor(scale * Manager.width);
        const scaledH = Math.floor(scale * Manager.height);
        const horizontalMargin = (screenWidth - scaledW) / 2;
        const verticalMargin = (screenHeight - scaledH) / 2;

        const view = Manager.app.view as HTMLCanvasElement;
        view.style.width = `${scaledW}px`;
        view.style.height = `${scaledH}px`;
        view.style.marginLeft = view.style.marginRight = `${horizontalMargin}px`;
        view.style.marginTop = view.style.marginBottom = `${verticalMargin}px`;
    }

    public static fadeTransition(onMid: () => void): void {
        gsap.to(Manager.introOverlay, {
            alpha: 1,
            duration: 0.3,
            onComplete: () => {
                onMid();
                gsap.to(Manager.introOverlay, { alpha: 0, duration: 0.4 });
            }
        });
    }

    public static changeScene(newScene: IScene): void {
        // First scene — no transition, just show it immediately
        // Insert at index 1: above persistentFrame(0), below introOverlay(top)
        if (!Manager.currentScene) {
            Manager.currentScene = newScene;
            Manager.app.stage.addChildAt(Manager.currentScene, 1);
            return;
        }

        gsap.to(Manager.introOverlay, {
            alpha: 1,
            duration: 0.3,
            onComplete: () => {
                Manager.app.stage.removeChild(Manager.currentScene);
                Manager.currentScene.destroy();
                Manager.currentScene = newScene;
                // After removing old scene: stage is [persistentFrame(0), introOverlay(1)]
                // Insert new scene at 1 → [persistentFrame(0), newScene(1), introOverlay(2)]
                Manager.app.stage.addChildAt(Manager.currentScene, 1);
                gsap.to(Manager.introOverlay, { alpha: 0, duration: 0.3 });
            }
        });
    }

    private static update(delta: number): void {
        if (Manager.currentScene) {
            Manager.currentScene.update(delta);
        }
    }
}

export interface IScene extends DisplayObject {
    update(framesPassed: number): void;
    goNext(_event: Event): void;
    goPrev(_event: Event): void;
}
