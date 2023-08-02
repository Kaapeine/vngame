import { Application } from "@pixi/app";
import { DisplayObject } from "@pixi/display";
import { Sound } from "@pixi/sound";
import { Sprite } from "pixi.js";

import { TitleScene } from "./TitleScene";
import { IntroScene } from "./IntroScene";
import { SceneFive } from "./SceneFive";
import { SceneFour } from "./SceneFour";
import { SceneOne } from "./SceneOne";
import { SceneSeven } from "./SceneSeven";
import { SceneSix } from "./SceneSix";
import { SceneThree } from "./SceneThree";
import { SceneTwo } from "./SceneTwo";
import { Scene8 } from "./Scene8";
import { Scene9 } from "./Scene9";
import { Scene10 } from "./Scene10";
import { Scene11 } from "./Scene11";
import { Scene12 } from "./Scene12";
import { Scene13 } from "./Scene13";
import { Scene14 } from "./Scene14";
import { Scene15 } from "./Scene15";
import { Scene16 } from "./Scene16";
import { Scene17 } from "./Scene17";
import { EndScene } from "./EndScene";
import { Credits } from "./Credits";

export class Manager {
    private constructor() { /*this class is purely static. No constructor to see here*/ }

    // Safely store variables for our game
    public static app: Application;
    private static currentScene: IScene;

    // Width and Height are read-only after creation (for now)
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

    // With getters but not setters, these variables become read-only
    public static get width(): number {
        return Manager._width;
    }
    public static get height(): number {
        return Manager._height;
    }

    // Use this function ONCE to start the entire machinery
    public static initialize(width: number, height: number, background: number): void {

        // store our width and height
        Manager._width = width;
        Manager._height = height;

        // Create our pixi app
        Manager.app = new Application({
            view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            backgroundColor: background,
            width: width,
            height: height
        });

        // listen for the browser telling us that the screen size changed
        window.addEventListener("resize", Manager.resize);

        // call it manually once so we are sure we are the correct size after starting
        Manager.resize();
        // Add the ticker
        Manager.app.ticker.add(Manager.update);

        Manager.loop1.loop = true;
        Manager.loop2.loop = true;

        Manager.loop1.play();   
        Manager.loadScenes1();
    }

    public static loadScenes1(): void {
        console.log("Loading one");
        const _titlescreen: IScene = new TitleScene;
        const _introscene: IScene = new IntroScene;
        const _scene1: IScene = new SceneOne;
        const _scene2: IScene = new SceneTwo;
        const _scene3: IScene = new SceneThree;
        // const _scene4: IScene = new SceneFour;
        // const _scene5: IScene = new SceneFive;
        // const _scene6: IScene = new SceneSix;
        // const _scene7: IScene = new SceneSeven;
        // const _scene8: IScene = new Scene8;
        // const _scene9: IScene = new Scene9;
        // const _scene10: IScene = new Scene10;
        // const _scene11: IScene = new Scene11;
        // const _scene12: IScene = new Scene12;
        // const _scene13: IScene = new Scene13;
        // const _scene14: IScene = new Scene14;
        // const _scene15: IScene = new Scene15;
        // const _scene16: IScene = new Scene16;
        // const _scene17: IScene = new Scene17;
        // const _endscene: IScene = new EndScene;
        // const _credits: IScene = new Credits;
    }

    public static loadScenes2(): void {
        console.log("Loading two");
        // const _titlescreen: IScene = new TitleScene;
        // const _introscene: IScene = new IntroScene;
        // const _scene1: IScene = new SceneOne;
        // const _scene2: IScene = new SceneTwo;
        // const _scene3: IScene = new SceneThree;
        const _scene4: IScene = new SceneFour;
        const _scene5: IScene = new SceneFive;
        const _scene6: IScene = new SceneSix;
        const _scene7: IScene = new SceneSeven;
        const _scene8: IScene = new Scene8;
        // const _scene9: IScene = new Scene9;
        // const _scene10: IScene = new Scene10;
        // const _scene11: IScene = new Scene11;
        // const _scene12: IScene = new Scene12;
        // const _scene13: IScene = new Scene13;
        // const _scene14: IScene = new Scene14;
        // const _scene15: IScene = new Scene15;
        // const _scene16: IScene = new Scene16;
        // const _scene17: IScene = new Scene17;
        // const _endscene: IScene = new EndScene;
        // const _credits: IScene = new Credits;
    }

    public static loadScenes3(): void {
        console.log("Loading three");
        // const _titlescreen: IScene = new TitleScene;
        // const _introscene: IScene = new IntroScene;
        // const _scene1: IScene = new SceneOne;
        // const _scene2: IScene = new SceneTwo;
        // const _scene3: IScene = new SceneThree;
        // const _scene4: IScene = new SceneFour;
        // const _scene5: IScene = new SceneFive;
        // const _scene6: IScene = new SceneSix;
        // const _scene7: IScene = new SceneSeven;
        // const _scene8: IScene = new Scene8;
        const _scene9: IScene = new Scene9;
        const _scene10: IScene = new Scene10;
        const _scene11: IScene = new Scene11;
        const _scene12: IScene = new Scene12;
        const _scene13: IScene = new Scene13;
        // const _scene14: IScene = new Scene14;
        // const _scene15: IScene = new Scene15;
        // const _scene16: IScene = new Scene16;
        // const _scene17: IScene = new Scene17;
        // const _endscene: IScene = new EndScene;
        // const _credits: IScene = new Credits;
    }

    public static loadScenes4(): void {
        console.log("Loading four");
        // const _titlescreen: IScene = new TitleScene;
        // const _introscene: IScene = new IntroScene;
        // const _scene1: IScene = new SceneOne;
        // const _scene2: IScene = new SceneTwo;
        // const _scene3: IScene = new SceneThree;
        // const _scene4: IScene = new SceneFour;
        // const _scene5: IScene = new SceneFive;
        // const _scene6: IScene = new SceneSix;
        // const _scene7: IScene = new SceneSeven;
        // const _scene8: IScene = new Scene8;
        // const _scene9: IScene = new Scene9;
        // const _scene10: IScene = new Scene10;
        // const _scene11: IScene = new Scene11;
        // const _scene12: IScene = new Scene12;
        // const _scene13: IScene = new Scene13;
        const _scene14: IScene = new Scene14;
        const _scene15: IScene = new Scene15;
        const _scene16: IScene = new Scene16;
        const _scene17: IScene = new Scene17;
        const _endscene: IScene = new EndScene;
        const _credits: IScene = new Credits;
    }

    public static resize(): void {
        // current screen size
        const screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        const screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

        // uniform scale for our game
        const scale = Math.min(screenWidth / Manager.width, screenHeight / Manager.height);

        // the "uniformly englarged" size for our game
        const enlargedWidth = Math.floor(scale * Manager.width);
        const enlargedHeight = Math.floor(scale * Manager.height);

        // margins for centering our game
        const horizontalMargin = (screenWidth - enlargedWidth) / 2;
        const verticalMargin = (screenHeight - enlargedHeight) / 2;

        // now we use css trickery to set the sizes and margins
        Manager.app.view.style.width = `${enlargedWidth}px`;
        Manager.app.view.style.height = `${enlargedHeight}px`;
        Manager.app.view.style.marginLeft = Manager.app.view.style.marginRight = `${horizontalMargin}px`;
        Manager.app.view.style.marginTop = Manager.app.view.style.marginBottom = `${verticalMargin}px`;
    }

    // Call this function when you want to go to a new scene
    public static changeScene(newScene: IScene): void {
        // Remove and destroy old scene... if we had one..
        if (Manager.currentScene) {
            Manager.app.stage.removeChild(Manager.currentScene);
            Manager.currentScene.destroy();
        }

        let splash: Sprite = Sprite.from('intro_scene/Intro.jpg');
        splash.scale.set(1.5, 1.5);
        Manager.app.stage.addChild(splash);

        let frame: Sprite = Sprite.from('frame.png');
        Manager.app.stage.addChild(frame);

        console.log(newScene.constructor.name)

        if (newScene.constructor.name == "TitleScene")
            this.loadScenes2();
        if (newScene.constructor.name == "IntroScene")
            this.loadScenes2();
        if (newScene.constructor.name == "SceneOne")
            this.loadScenes3();
        if (newScene.constructor.name == "SceneTwo")
            this.loadScenes4();

        // Add the new one
        Manager.currentScene = newScene;
        window.setTimeout(function() {
            Manager.app.stage.addChild(Manager.currentScene);
        }, 1000);
    }

    // This update will be called by a pixi ticker and tell the scene that a tick happened
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
    addFrame(): void;
}
