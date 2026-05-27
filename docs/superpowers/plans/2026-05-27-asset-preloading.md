# Asset Preloading Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the hacky scene-instantiation preload and manual `setTimeout` with a central asset manifest and `Loader.shared`, auto-navigating to `TitleScene` when all assets are cached.

**Architecture:** A new `src/assets.ts` exports a flat array of every image path used in the game. `LoadingScreen` feeds this array to PixiJS's `Loader.shared`, then navigates to `TitleScene` in the load callback. `Manager.changeScene()` drops its own `setTimeout` since all textures are guaranteed cached before any scene is constructed.

**Tech Stack:** PixiJS v6, `PIXI.Loader` (global shared loader), TypeScript

---

### Task 1: Create the central asset manifest

**Files:**
- Create: `src/assets.ts`

- [ ] **Step 1: Create `src/assets.ts` with every image path referenced across all scene files**

```ts
export const ASSETS: string[] = [
  // shared
  'frame.png',
  'rbutton/Forward.png',
  'rbutton/Forward_Hover.png',
  'rbutton/Forward_Clicked.png',
  'lbutton/Back.png',
  'lbutton/Back_Hover.png',
  'lbutton/Back_Clicked.png',

  // loading screen
  'loading/LoadingCircle.png',
  'loading/LoadingText.png',

  // intro / firefly cursor (reused across all scenes)
  'intro_scene/Intro.jpg',
  'intro_scene/intro_text.png',
  'intro_scene/firefly/firefly-1.png',
  'intro_scene/firefly/firefly-2.png',
  'intro_scene/firefly/firefly-3.png',
  'intro_scene/firefly/firefly-4.png',
  'intro_scene/firefly/firefly-5.png',
  'intro_scene/rev_firefly/RevFirefly-1.png',
  'intro_scene/rev_firefly/RevFirefly-2.png',
  'intro_scene/rev_firefly/RevFirefly-3.png',
  'intro_scene/rev_firefly/RevFirefly-4.png',
  'intro_scene/rev_firefly/RevFirefly-5.png',

  // title screen
  'title_screen/BG.png',
  'title_screen/Front.png',
  'title_screen/Leaves.png',
  'title_screen/heart/1.png',
  'title_screen/heart/2.png',
  'title_screen/heart/3.png',
  'title_screen/heart/4.png',

  // scene one
  'scene_one/Background.png',
  'scene_one/House_Grass.png',
  'scene_one/wheat.png',
  'scene_one/Aami.png',
  'scene_one/jackal_new.png',
  'scene_one/Text1.png',
  'scene_one/Text2.png',
  'scene_one/Text3.png',
  'scene_one/rain/rain-1.png',
  'scene_one/rain/rain-2.png',
  'scene_one/rain/rain-3.png',

  // scene two (also reused by scene 15)
  'scene_two/Background.png',
  'scene_two/Aami.png',
  'scene_two/Grass.png',
  'scene_two/Jackal.png',
  'scene_two/Pillars.png',
  'scene_two/Text_1.png',
  'scene_two/Text2.png',

  // scene three
  'scene_three/Background.png',
  'scene_three/Aami.png',
  'scene_three/BG_Trees_new.png',
  'scene_three/find.png',
  'scene_three/FireGlow.png',
  'scene_three/House1Closed.png',
  'scene_three/House1Open.png',
  'scene_three/House2Closed.png',
  'scene_three/House2Open.png',
  'scene_three/House3Closed.png',
  'scene_three/House3Open.png',
  'scene_three/Text 1.png',
  'scene_three/candle/CandleFire-1.png',
  'scene_three/candle/CandleFire-2.png',
  'scene_three/candle/CandleFire-3.png',
  'scene_three/candle/CandleFire.png',
  'scene_three/new/Glow 1.png',
  'scene_three/new/Glow 2.png',
  'scene_three/new/Text 1.png',
  'scene_three/new/Text 2 .png',

  // scene four
  'scene_four/Background.png',
  'scene_four/DRAG INGRIDIENTS INTO THE POT.png',
  'scene_four/Meal.png',
  'scene_four/pot.png',
  'scene_four/Text 1.png',
  'scene_four/Text 2.png',
  'scene_four/fire/KitchenFire-1.png',
  'scene_four/fire/KitchenFire-2.png',
  'scene_four/fire/KitchenFire-3.png',
  'scene_four/smoke/KitchenSmoke-1.png',
  'scene_four/smoke/KitchenSmoke-2.png',
  'scene_four/smoke/KitchenSmoke-3.png',
  'scene_four/smoke/KitchenSmoke-4.png',

  // scene five
  'scene_five/Background.png',
  'scene_five/Aami and Plate.png',
  'scene_five/CLICK AGAIN!.png',
  'scene_five/CLICK ON THE JACKAL TO CALL HIM.png',
  'scene_five/Grass.png',
  'scene_five/Jackal1.png',
  'scene_five/Jackal2.png',
  'scene_five/Jackal3.png',
  'scene_five/ojackal.png',
  'scene_five/Text 1.png',
  'scene_five/Text 2.png',
  'scene_five/Text 3.png',

  // scene six
  'scene_six/Background.png',
  'scene_six/Glow.png',
  'scene_six/Overlay with Text 1.png',
  'scene_six/Text 1.png',
  'scene_six/Text2.png',
  'scene_six/soul/Scene6Soul1.png',
  'scene_six/soul/Scene6Soul2.png',
  'scene_six/soul/Scene6Soul3.png',
  'scene_six/soul/Scene6Soul4.png',

  // scene seven
  'scene_seven/Background.png',
  'scene_seven/clearbush2.png',
  'scene_seven/Grass.png',
  'scene_seven/Layer 13.png',
  'scene_seven/Layer1Aami.png',
  'scene_seven/Layer2Aami.png',
  'scene_seven/Layer3Aami.png',
  'scene_seven/LeftBush.png',
  'scene_seven/LeftBush 2.png',
  'scene_seven/LeftTree.png',
  'scene_seven/LeftTree 2.png',
  'scene_seven/MidTree.png',
  'scene_seven/RightBush.png',
  'scene_seven/RightBush 2.png',
  'scene_seven/RightTree.png',
  'scene_seven/RightTree 2.png',
  'scene_seven/Text 1.png',
  'scene_seven/Text 2.png',
  'scene_seven/Text 3.png',

  // scene eight
  'scene_eight/Background.png',
  'scene_eight/BG.png',
  'scene_eight/Aami.png',
  'scene_eight/Glow.png',
  'scene_eight/Glow 2.png',
  'scene_eight/Tiger.png',
  'scene_eight/Text 1.png',
  'scene_eight/Text 2.png',
  'scene_eight/Text 3.png',
  'scene_eight/Text 4.png',
  'scene_eight/bg_shift/Scene8BGShift1.png',
  'scene_eight/bg_shift/Scene8BGShift2.png',
  'scene_eight/bg_shift/Scene8BGShift3.png',
  'scene_eight/bg_shift/Scene8BGShift4.png',

  // scene 9
  'scene_9/Background.png',
  'scene_9/Aami.png',
  'scene_9/hover.png',
  'scene_9/Kalmegh.png',
  'scene_9/Kalmegh Hovered.png',
  'scene_9/Nona tenga.png',
  'scene_9/Noga tenga Hovered.png',
  'scene_9/Titaphul.png',
  'scene_9/Titaphul hovered.png',
  'scene_9/Strong.png',
  'scene_9/Weak.png',
  'scene_9/Text 1.png',
  'scene_9/Text 2.png',

  // scene 10
  'scene_10/Layer 26.png',
  'scene_10/Water.png',
  'scene_10/Text 1.png',
  'scene_10/waves/Scene10Waves1.png',
  'scene_10/waves/Scene10Waves2.png',
  'scene_10/waves/Scene10Waves3.png',
  'scene_10/waves/Scene10Waves4.png',

  // scene 11
  'scene_11/Background.png',
  'scene_11/Text1.png',
  'scene_11/Text2.png',
  'scene_11/Text3.png',
  'scene_11/glowstring/Scene11GlowString1.png',
  'scene_11/glowstring/Scene11GlowString2.png',
  'scene_11/glowstring/Scene11GlowString3.png',
  'scene_11/glowstring/Scene11GlowString4.png',
  'scene_11/glowstring/Scene11GlowString5.png',
  'scene_11/glowstring/Scene11GlowString6.png',

  // scene 12
  'scene_12/Background.png',
  'scene_12/Aami.png',
  'scene_12/Lake.png',
  'scene_12/Trees.png',
  'scene_12/Goddess.png',
  'scene_12/Clear Water (hidden).png',
  'scene_12/click.png',
  'scene_12/Text1.png',
  'scene_12/Text2.png',
  'scene_12/Text3.png',
  'scene_12/Text4.png',

  // scene 13
  'scene_13/Background.png',
  'scene_13/Malati.png',
  'scene_13/Text1.png',
  'scene_13/Text2.png',
  'scene_13/glow/Scene13GoddessGlow1.png',
  'scene_13/glow/Scene13GoddessGlow2.png',
  'scene_13/glow/Scene13GoddessGlow3.png',
  'scene_13/glow/Scene13GoddessGlow4.png',

  // scene 14
  'scene_14/Background.png',
  'scene_14/Aami.png',
  'scene_14/Grass.png',
  'scene_14/LeftTree.png',
  'scene_14/MidTree.png',
  'scene_14/RightTree.png',
  'scene_14/click.png',
  'scene_14/Scene14LeftFlower1.png',
  'scene_14/Scene14LeftFlower2.png',
  'scene_14/Scene14MidFlower1.png',
  'scene_14/Scene14MidFlower2.png',
  'scene_14/Scene14RightFlower1.png',
  'scene_14/Scene14RightFlower2.png',
  'scene_14/Scene14Stars1.png',
  'scene_14/Scene14Stars2.png',
  'scene_14/Text1.png',
  'scene_14/Text2.png',
  'scene_14/Text3.png',

  // scene 15 (uses scene_two backgrounds + own text)
  'scene_15/Text 1.png',
  'scene_15/Text 2.png',

  // scene 16
  'scene_16/Background.png',
  'scene_16/Aami & Jackal.png',
  'scene_16/Wheat.png',
  'scene_16/Dialogue.png',
  'scene_16/Text1.png',
  'scene_16/Text2.png',

  // scene 17
  'scene_17/Background.png',
  'scene_17/Aami.png',
  'scene_17/Ground.png',
  'scene_17/Jackal1.png',
  'scene_17/Jackal2.png',
  'scene_17/Layer 6.png',
  'scene_17/Text1.png',
  'scene_17/Text2.png',
  'scene_17/Text3.png',

  // end
  'end/TheEnd1.png',
  'end/TheEnd2.png',
  'end/TheEnd3.png',

  // credits
  'credits/Background.png',
  'credits/Text2 copy 3.png',
  'credits/Text2 copy 4.png',
  'credits/Text2 copy 5.png',
];
```

- [ ] **Step 2: Verify the file compiles**

```bash
cd /Users/vathsa/Documents/Projects/vngame && npm run build-only 2>&1 | tail -5
```

Expected: `compiled successfully`

- [ ] **Step 3: Commit**

```bash
git add src/assets.ts
git commit -m "feat: add central asset manifest"
```

---

### Task 2: Update LoadingScreen to use Loader.shared

**Files:**
- Modify: `src/LoadingScreen.ts`

`Loader.shared` is PixiJS v6's global asset loader. Calling `.add(urls).load(callback)` fetches all URLs and populates the texture cache; the callback fires exactly once when every asset has loaded. All subsequent `Texture.from()` calls across every scene will hit the cache and return synchronously.

- [ ] **Step 1: Replace `src/LoadingScreen.ts` with the version below**

Key changes:
- Import `Loader` from `pixi.js` and `ASSETS` from `./assets`
- Remove all scene imports except `TitleScene`
- Constructor starts `Loader.shared.add(ASSETS).load(...)` — navigates to `TitleScene` in callback
- `loadScenes()`, `addButtons()`, `goNext()`, `goPrev()` removed (IScene still satisfied with stubs)

```ts
import { Container, Texture, Sprite, AnimatedSprite, Point, InteractionEvent, Loader } from "pixi.js";
import { IScene, Manager } from "./Manager";
import { TitleScene } from "./TitleScene";
import { ASSETS } from "./assets";

export class LoadingScreen extends Container implements IScene {

  private mainContainer: Container = new Container();
  private cursorFirefly: AnimatedSprite;
  private spinner: Sprite;

  constructor() {
    super();

    Manager.loop1.play();
    Manager.loop2.stop();

    const fireflySeq: Array<string> = [
      'intro_scene/firefly/firefly-1.png',
      'intro_scene/firefly/firefly-2.png',
      'intro_scene/firefly/firefly-3.png',
      'intro_scene/firefly/firefly-4.png',
      'intro_scene/firefly/firefly-5.png',
    ];
    let fireflyTextureSeq: Array<Texture> = [];
    for (let i = 0; i < fireflySeq.length; i++) {
      fireflyTextureSeq.push(Texture.from(fireflySeq[i]));
    }
    this.cursorFirefly = new AnimatedSprite(fireflyTextureSeq);
    this.cursorFirefly.play();
    this.cursorFirefly.animationSpeed = 0.05;

    this.mainContainer.position.set(148, 150);
    this.mainContainer.addChild(this.cursorFirefly);
    this.mainContainer.interactive = true;
    this.mainContainer.on('pointermove', this.moveCursorFirefly, this);

    this.spinner = Sprite.from('loading/LoadingCircle.png');
    this.spinner.anchor.set(0.5);
    this.spinner.position.set(811, 488);
    this.mainContainer.addChild(this.spinner);

    const loadingText: Sprite = Sprite.from('loading/LoadingText.png');
    loadingText.position.set(725, 300);
    this.mainContainer.addChild(loadingText);

    this.addChild(this.mainContainer);
    this.addFrame();

    Loader.shared.add(ASSETS).load(() => {
      Manager.changeScene(new TitleScene());
    });
  }

  public update(_delta: number): void {
    this.cursorFirefly.x += 2 * Math.random() * (Math.round(Math.random()) * 2 - 1);
    this.cursorFirefly.y += 2 * Math.random() * (Math.round(Math.random()) * 2 - 1);
    this.spinner.rotation += 0.05;
  }

  public moveCursorFirefly(e: InteractionEvent): void {
    const globalPos: Point = e.data.global;
    const localPos: Point = this.mainContainer.toLocal(globalPos);
    this.cursorFirefly.position.set(localPos.x - 20, localPos.y + 20);
  }

  public goNext(_event: Event): void {}
  public goPrev(_event: Event): void {}

  public addFrame(): void {
    const bgFrame: Sprite = Sprite.from('frame.png');
    this.addChild(bgFrame);
  }
}
```

- [ ] **Step 2: Verify the build compiles**

```bash
npm run build-only 2>&1 | tail -5
```

Expected: `compiled successfully`

- [ ] **Step 3: Commit**

```bash
git add src/LoadingScreen.ts
git commit -m "feat: replace scene-instantiation hack with Loader.shared preload"
```

---

### Task 3: Remove the setTimeout from Manager.changeScene

**Files:**
- Modify: `src/Manager.ts`

The 1-second `setTimeout` in `changeScene` was a workaround for assets not being cached yet. With preloading complete before any scene is constructed, the scene can be added to the stage immediately.

Also remove the 20 scene imports that are only there for the commented-out `loadScenes2/3/4` functions — they're dead code.

- [ ] **Step 1: Replace `src/Manager.ts` with the version below**

```ts
import { Application } from "@pixi/app";
import { DisplayObject } from "@pixi/display";
import { Sound } from "@pixi/sound";
import { Sprite } from "pixi.js";

export class Manager {
    private constructor() {}

    public static app: Application;
    private static currentScene: IScene;

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

    public static resize(): void {
        const screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        const screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

        const scale = Math.min(screenWidth / Manager.width, screenHeight / Manager.height);
        const enlargedWidth = Math.floor(scale * Manager.width);
        const enlargedHeight = Math.floor(scale * Manager.height);
        const horizontalMargin = (screenWidth - enlargedWidth) / 2;
        const verticalMargin = (screenHeight - enlargedHeight) / 2;

        Manager.app.view.style.width = `${enlargedWidth}px`;
        Manager.app.view.style.height = `${enlargedHeight}px`;
        Manager.app.view.style.marginLeft = Manager.app.view.style.marginRight = `${horizontalMargin}px`;
        Manager.app.view.style.marginTop = Manager.app.view.style.marginBottom = `${verticalMargin}px`;
    }

    public static changeScene(newScene: IScene): void {
        if (Manager.currentScene) {
            Manager.app.stage.removeChild(Manager.currentScene);
            Manager.currentScene.destroy();
        }

        let splash: Sprite = Sprite.from('intro_scene/Intro.jpg');
        splash.scale.set(1.5, 1.5);
        Manager.app.stage.addChild(splash);

        let frame: Sprite = Sprite.from('frame.png');
        Manager.app.stage.addChild(frame);

        Manager.currentScene = newScene;
        Manager.app.stage.addChild(Manager.currentScene);
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
    addFrame(): void;
}
```

- [ ] **Step 2: Build and verify**

```bash
npm run build-only 2>&1 | tail -5
```

Expected: `compiled successfully`

- [ ] **Step 3: Smoke-test in the browser**

```bash
npm start
```

Open `http://localhost:1234`. Expected behaviour:
- Loading screen appears with spinning circle
- After all assets load (~varies by connection), automatically transitions to TitleScene — no button click required
- Navigating between scenes is instantaneous (no visible loading delay)

- [ ] **Step 4: Commit**

```bash
git add src/Manager.ts
git commit -m "feat: remove setTimeout from changeScene now that assets are preloaded"
```
