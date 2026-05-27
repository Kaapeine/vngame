# Polish & Transitions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix known bugs and code quality issues, add a scene fade transition using Intro.jpg, and add GSAP fade-ins for user interactions in SceneOne.

**Architecture:** GSAP is installed as the animation engine. Manager gains two persistent stage children (introOverlay + frame) that outlive individual scenes. `addFrame()` is removed from all scenes and the IScene interface — frame management moves to Manager. SceneOne's `showJackal()` uses `gsap.to()` for every element that appears or changes.

**Tech Stack:** PixiJS v6, GSAP v3, TypeScript

---

### Task 1: Install GSAP

**Files:**
- Modify: `package.json` (via npm)

- [ ] **Step 1: Install GSAP**

```bash
cd /Users/vathsa/Documents/Projects/vngame && npm install gsap
```

Expected output: `added 1 package` (GSAP v3 ships with its own TypeScript types — no `@types/gsap` needed)

- [ ] **Step 2: Verify build still passes**

```bash
npm run build-only 2>&1 | tail -3
```

Expected: `compiled successfully`

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install gsap"
```

---

### Task 2: Fix TitleScene.ts debug leftovers

**Files:**
- Modify: `src/TitleScene.ts`

- [ ] **Step 1: Remove the console.log and replace alert with a no-op**

In `src/TitleScene.ts`, apply both changes:

Remove this line from `addHeart()`:
```ts
console.log("Size: ", heartTextureSequence.length);
```

Replace the body of `goPrev`:
```ts
// Before
public goPrev(_event: Event): void {
    alert('hi');
}

// After
public goPrev(_event: Event): void {}
```

- [ ] **Step 2: Verify build**

```bash
npm run build-only 2>&1 | tail -3
```

Expected: `compiled successfully`

- [ ] **Step 3: Commit**

```bash
git add src/TitleScene.ts
git commit -m "fix: remove console.log and alert debug leftovers from TitleScene"
```

---

### Task 3: Fix IntroScene var re-declaration and SceneOne equality operators

**Files:**
- Modify: `src/IntroScene.ts`
- Modify: `src/SceneOne.ts`

- [ ] **Step 1: Fix IntroScene.ts var re-declaration**

In `src/IntroScene.ts`, inside `addFireflies()`, replace the `if/else var` block:

```ts
// Before
if (rnd < 0.5) {
    var firefly: AnimatedSprite = new AnimatedSprite(fireflyTextureSeq);
}
else {
    var firefly: AnimatedSprite = new AnimatedSprite(revFireflyTextureSeq);
}

// After
const firefly: AnimatedSprite = new AnimatedSprite(
    rnd < 0.5 ? fireflyTextureSeq : revFireflyTextureSeq
);
```

- [ ] **Step 2: Fix SceneOne.ts equality operators**

In `src/SceneOne.ts`, in `showJackal()`, replace all four `==` comparisons with `===`:

```ts
// Before
if (this.numClicks == 0) {
if (this.numClicks == 1) {
if (this.numClicks == 2) {
if (this.numClicks == 3){

// After
if (this.numClicks === 0) {
if (this.numClicks === 1) {
if (this.numClicks === 2) {
if (this.numClicks === 3) {
```

- [ ] **Step 3: Verify build**

```bash
npm run build-only 2>&1 | tail -3
```

Expected: `compiled successfully`

- [ ] **Step 4: Commit**

```bash
git add src/IntroScene.ts src/SceneOne.ts
git commit -m "fix: var re-declaration in IntroScene, === operators in SceneOne"
```

---

### Task 4: Fix lib.ts naming, type, and update SceneFour.ts + missing asset manifest entries

**Files:**
- Modify: `src/lib.ts`
- Modify: `src/SceneFour.ts`
- Modify: `src/assets.ts`

`dragSprite` violates PascalCase. `Boolean` (object wrapper type) should be `boolean` (primitive). SceneFour uses `dragSprite` at 5 call sites. The ingredient assets passed to `dragSprite` are also missing from the manifest.

- [ ] **Step 1: Rename class and fix type in lib.ts**

In `src/lib.ts`:

```ts
// Before
export class dragSprite {
    public sprite: Sprite;
    public destroyOnCollision: Boolean = true;

// After
export class DragSprite {
    public sprite: Sprite;
    public destroyOnCollision: boolean = true;
```

- [ ] **Step 2: Update SceneFour.ts import and all 5 usages**

In `src/SceneFour.ts`:

```ts
// Before
import { dragSprite } from "./lib";
// ...
let spice: dragSprite = new dragSprite('scene_four/Spice.png', this.mainContainer, pot);
// ...
let coconutmilk: dragSprite = new dragSprite('scene_four/Coconut Milk.png', this.mainContainer, pot);
// ...
let dryfruit: dragSprite = new dragSprite('scene_four/Dry Fruits.png', this.mainContainer, pot);
// ...
let rice: dragSprite = new dragSprite('scene_four/Rice.png', this.mainContainer, pot);
// ...
let honey: dragSprite = new dragSprite('scene_four/Honey.png', this.mainContainer, pot);

// After
import { DragSprite } from "./lib";
// ...
const spice: DragSprite = new DragSprite('scene_four/Spice.png', this.mainContainer, pot);
// ...
const coconutmilk: DragSprite = new DragSprite('scene_four/Coconut Milk.png', this.mainContainer, pot);
// ...
const dryfruit: DragSprite = new DragSprite('scene_four/Dry Fruits.png', this.mainContainer, pot);
// ...
const rice: DragSprite = new DragSprite('scene_four/Rice.png', this.mainContainer, pot);
// ...
const honey: DragSprite = new DragSprite('scene_four/Honey.png', this.mainContainer, pot);
```

- [ ] **Step 3: Add missing ingredient assets to the manifest**

In `src/assets.ts`, add these 5 paths to the `// scene four` section (after `'scene_four/pot.png'`):

```ts
  'scene_four/Spice.png',
  'scene_four/Coconut Milk.png',
  'scene_four/Dry Fruits.png',
  'scene_four/Rice.png',
  'scene_four/Honey.png',
```

- [ ] **Step 4: Verify build**

```bash
npm run build-only 2>&1 | tail -3
```

Expected: `compiled successfully`

- [ ] **Step 5: Commit**

```bash
git add src/lib.ts src/SceneFour.ts src/assets.ts
git commit -m "fix: rename dragSprite to DragSprite, fix boolean type, add missing scene_four assets to manifest"
```

---

### Task 5: Replace let with const across all scene files

**Files:**
- Modify: all `.ts` files in `src/`

Variables assigned once should be `const`. TypeScript will error at build time if any replaced variable is actually reassigned — making this safe to do with sed.

- [ ] **Step 1: Run sed replacements for common never-reassigned patterns**

```bash
cd /Users/vathsa/Documents/Projects/vngame

# Texture sequence arrays (array reference never reassigned, only .push'd)
sed -i '' 's/\blet fireflyTextureSeq\b/const fireflyTextureSeq/g' src/*.ts
sed -i '' 's/\blet revFireflyTextureSeq\b/const revFireflyTextureSeq/g' src/*.ts
sed -i '' 's/\blet rainTextureSeq\b/const rainTextureSeq/g' src/*.ts
sed -i '' 's/\blet heartTextureSequence\b/const heartTextureSequence/g' src/*.ts
sed -i '' 's/\blet fireflyTextureSeq\b/const fireflyTextureSeq/g' src/*.ts

# Loop temporaries
sed -i '' 's/\blet tex\b/const tex/g' src/*.ts

# Event handler locals
sed -i '' 's/\blet globalPos\b/const globalPos/g' src/*.ts
sed -i '' 's/\blet localPos\b/const localPos/g' src/*.ts
sed -i '' 's/\blet x_off\b/const x_off/g' src/*.ts
sed -i '' 's/\blet y_off\b/const y_off/g' src/*.ts

# IntroScene math temporaries
sed -i '' 's/\blet rnd\b/const rnd/g' src/*.ts
sed -i '' 's/\blet theta\b/const theta/g' src/*.ts
sed -i '' 's/\blet dist\b/const dist/g' src/*.ts
```

- [ ] **Step 2: Verify build catches nothing**

```bash
npm run build-only 2>&1 | tail -5
```

Expected: `compiled successfully`. If TypeScript errors with "Cannot assign to 'x' because it is a constant", that variable was genuinely reassigned — revert just that substitution with `sed -i '' 's/\bconst x\b/let x/g' src/<file>.ts`.

- [ ] **Step 3: Commit**

```bash
git add src/*.ts
git commit -m "fix: replace let with const for all never-reassigned variables"
```

---

### Task 6: Manager.ts — persistent frame, intro overlay, and GSAP scene transition

**Files:**
- Modify: `src/Manager.ts`

This task rewrites Manager.ts in full. Key changes:
- Import `gsap`
- Add `private static persistentFrame: Sprite` and `private static introOverlay: Sprite`
- `initialize()` adds both to the stage after the ticker is set up
- `changeScene()` skips the transition on the very first call (no current scene), then uses GSAP fade for all subsequent transitions
- `addFrame()` removed from the `IScene` interface (scenes still have the method for now — TypeScript won't complain about extra methods; Task 7 cleans them up)

- [ ] **Step 1: Replace src/Manager.ts with the following**

```ts
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

        // Intro.jpg overlay — sits above scene content, below frame, alpha=0 at rest
        Manager.introOverlay = Sprite.from('intro_scene/Intro.jpg');
        Manager.introOverlay.position.set(148, 150);
        Manager.introOverlay.alpha = 0;
        Manager.app.stage.addChild(Manager.introOverlay);

        // Persistent frame — always on top of everything
        Manager.persistentFrame = Sprite.from('frame.png');
        Manager.app.stage.addChild(Manager.persistentFrame);
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
        // First scene — no transition, just show it immediately
        if (!Manager.currentScene) {
            Manager.currentScene = newScene;
            Manager.app.stage.addChildAt(Manager.currentScene, 0);
            return;
        }

        gsap.to(Manager.introOverlay, {
            alpha: 1,
            duration: 0.3,
            onComplete: () => {
                Manager.app.stage.removeChild(Manager.currentScene);
                Manager.currentScene.destroy();
                Manager.currentScene = newScene;
                Manager.app.stage.addChildAt(Manager.currentScene, 0);
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
```

- [ ] **Step 2: Verify build**

```bash
npm run build-only 2>&1 | tail -3
```

Expected: `compiled successfully`

- [ ] **Step 3: Commit**

```bash
git add src/Manager.ts
git commit -m "feat: persistent frame + Intro.jpg overlay + GSAP scene fade transition"
```

---

### Task 7: Remove addFrame() from all 22 scene files

**Files:**
- Modify: `src/LoadingScreen.ts`, `src/TitleScene.ts`, `src/IntroScene.ts`, `src/SceneOne.ts`, `src/SceneTwo.ts`, `src/SceneThree.ts`, `src/SceneFour.ts`, `src/SceneFive.ts`, `src/SceneSix.ts`, `src/SceneSeven.ts`, `src/Scene8.ts`, `src/Scene9.ts`, `src/Scene10.ts`, `src/Scene11.ts`, `src/Scene12.ts`, `src/Scene13.ts`, `src/Scene14.ts`, `src/Scene15.ts`, `src/Scene16.ts`, `src/Scene17.ts`, `src/EndScene.ts`, `src/Credits.ts`

The frame is now Manager's responsibility. Each scene currently adds a second frame on top via `addFrame()`. Remove both the method call and the method definition from every scene.

- [ ] **Step 1: Remove all this.addFrame() constructor calls**

```bash
cd /Users/vathsa/Documents/Projects/vngame
sed -i '' '/this\.addFrame();/d' src/*.ts
```

- [ ] **Step 2: Remove the addFrame() method definition from every scene file**

Every scene has this exact method (some with `let` instead of `const`, some with a comment — remove the whole block in each file):

```ts
public addFrame(): void {
    const bgFrame: Sprite = Sprite.from('frame.png');
    this.addChild(bgFrame); // add frame on top of everything
}
```

Open each of the 22 files and delete the `addFrame()` method. After deletion, also check whether `Sprite` is still imported in the file — if `addFrame()` was the only place `Sprite` was used in the import, remove `Sprite` from the import line. (In most scenes `Sprite` is used elsewhere too, so the import stays.)

- [ ] **Step 3: Verify build**

```bash
npm run build-only 2>&1 | tail -3
```

Expected: `compiled successfully`

- [ ] **Step 4: Smoke-test in browser**

```bash
npm start
```

Open `http://localhost:1234`. Verify:
- Frame is visible on the loading screen
- Navigating to TitleScene shows the Intro.jpg fade (content area fades, outer frame stays visible)
- Frame never flickers or doubles

- [ ] **Step 5: Commit**

```bash
git add src/*.ts
git commit -m "feat: remove addFrame() from all scenes — frame now managed by Manager"
```

---

### Task 8: SceneOne interaction fade-ins

**Files:**
- Modify: `src/SceneOne.ts`

Add `import gsap from 'gsap'`, change rButton initialisation, and rewrite `showJackal()` with per-click fade-ins.

- [ ] **Step 1: Add gsap import to SceneOne.ts**

At the top of `src/SceneOne.ts`, add:

```ts
import gsap from 'gsap';
```

- [ ] **Step 2: Change rButton initialisation in addButtons()**

In `addButtons()`, replace `this.rButton.visible = false` with:

```ts
this.rButton.alpha = 0;
this.rButton.interactive = false;
```

- [ ] **Step 3: Rewrite showJackal() with GSAP fade-ins**

Replace the entire `showJackal()` method:

```ts
public showJackal(_event: Event): void {
    if (this.numClicks === 0) {
        const jackal: Sprite = Sprite.from('scene_one/jackal_new.png');
        jackal.position.set(1075, 537);
        jackal.alpha = 0;
        this.mainContainer.addChild(jackal);
        gsap.to(jackal, { alpha: 1, duration: 0.3 });
        this.numClicks++;
        return;
    }
    if (this.numClicks === 1) {
        this.text1.position.set(80, 200);
        this.text1.alpha = 0;
        this.mainContainer.addChild(this.text1);
        gsap.to(this.text1, { alpha: 1, duration: 0.3 });
        this.numClicks++;
        return;
    }
    if (this.numClicks === 2) {
        gsap.to(this.text1, {
            alpha: 0,
            duration: 0.2,
            onComplete: () => this.mainContainer.removeChild(this.text1)
        });
        this.text2.position.set(720, 45);
        this.text2.alpha = 0;
        this.mainContainer.addChild(this.text2);
        gsap.to(this.text2, { alpha: 1, duration: 0.3 });
        this.numClicks++;
        return;
    }
    if (this.numClicks === 3) {
        gsap.to(this.text2, {
            alpha: 0,
            duration: 0.2,
            onComplete: () => {
                this.text2.texture = Texture.from('scene_one/Text3.png');
                gsap.to(this.text2, { alpha: 1, duration: 0.3 });
            }
        });
        gsap.to(this.rButton, {
            alpha: 1,
            duration: 0.3,
            onComplete: () => { this.rButton.interactive = true; }
        });
        this.numClicks++;
        return;
    }
}
```

- [ ] **Step 4: Verify build**

```bash
npm run build-only 2>&1 | tail -3
```

Expected: `compiled successfully`

- [ ] **Step 5: Smoke-test SceneOne in browser**

```bash
npm start
```

Open `http://localhost:1234`, navigate to SceneOne. Verify:
- Clicking wheat → jackal fades in smoothly
- Clicking again → text1 fades in
- Clicking again → text1 fades out while text2 fades in simultaneously
- Clicking again → text2 fades out, texture changes to Text3, fades back in; forward button fades in
- Forward button is not clickable until it has fully appeared

- [ ] **Step 6: Commit**

```bash
git add src/SceneOne.ts
git commit -m "feat: add GSAP fade-in transitions for SceneOne interactions"
```
