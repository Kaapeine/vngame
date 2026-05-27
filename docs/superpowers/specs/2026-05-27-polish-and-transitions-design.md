# Polish & Transitions Design

## Goal

Three improvements to the game in one pass:
1. Fix known bugs and code quality issues
2. Add a scene fade transition using `intro_scene/Intro.jpg`
3. Add element fade-ins for user interactions in SceneOne

---

## Section 1 — Code Fixes

Seven targeted fixes with no behaviour changes.

### 1.1 Manager.ts — orphaned splash + frame sprites

`changeScene()` currently adds a `splash` (Intro.jpg) and `frame` sprite on every call but never removes them. After several scene changes, the stage accumulates orphaned sprites. Both are removed as part of the persistent-frame change in Section 2.

### 1.2 TitleScene.ts — debug leftovers

- Remove `console.log("Size: ", heartTextureSequence.length)`
- Replace `alert('hi')` in `goPrev` with a no-op (no scene precedes TitleScene)

### 1.3 IntroScene.ts — `var` re-declaration

```ts
// Before (broken: var is function-scoped, declared twice)
if (rnd < 0.5) {
    var firefly: AnimatedSprite = new AnimatedSprite(fireflyTextureSeq);
} else {
    var firefly: AnimatedSprite = new AnimatedSprite(revFireflyTextureSeq);
}

// After
const firefly: AnimatedSprite = new AnimatedSprite(
    rnd < 0.5 ? fireflyTextureSeq : revFireflyTextureSeq
);
```

### 1.4 SceneOne.ts — `==` vs `===`

Replace all `this.numClicks == N` comparisons with `this.numClicks === N`.

### 1.5 lib.ts — naming and type issues

- Rename `dragSprite` class to `DragSprite` (PascalCase)
- Change `destroyOnCollision: Boolean` to `destroyOnCollision: boolean` (primitive type)

### 1.6 All scenes — `let` → `const`

Replace `let` with `const` for all variables that are never reassigned (textures, sprites, positions, sequences). Affects every scene file.

---

## Section 2 — Scene Fade Transition

### Approach

Use GSAP to animate a persistent `Sprite` overlay (Intro.jpg) that sits between the scene content and the persistent frame. The frame itself becomes a Manager-owned persistent element rather than being added by each scene.

### Stage layer order

```
Manager.app.stage
 ├── currentScene           ← active scene (bottom)
 ├── introOverlay           ← Intro.jpg sprite at (148, 150), alpha=0 at rest
 └── persistentFrame        ← frame.png, always on top
```

### Manager changes

**`initialize()`** creates two persistent display objects added to the stage once:
- `Manager.persistentFrame`: `Sprite.from('frame.png')` — sits at top of stage permanently
- `Manager.introOverlay`: `Sprite.from('intro_scene/Intro.jpg')` at position (148, 150), `alpha = 0`

**`changeScene(newScene)`** sequence:
1. GSAP tweens `introOverlay.alpha` from `0` to `1` over 300ms
2. `onComplete`: remove old scene from stage + destroy it, add new scene to stage (below overlay)
3. GSAP immediately tweens `introOverlay.alpha` from `1` to `0` over 300ms

```ts
public static changeScene(newScene: IScene): void {
    gsap.to(Manager.introOverlay, {
        alpha: 1,
        duration: 0.3,
        onComplete: () => {
            if (Manager.currentScene) {
                Manager.app.stage.removeChild(Manager.currentScene);
                Manager.currentScene.destroy();
            }
            Manager.currentScene = newScene;
            Manager.app.stage.addChildAt(Manager.currentScene, 0);
            gsap.to(Manager.introOverlay, { alpha: 0, duration: 0.3 });
        }
    });
}
```

### IScene interface change

`addFrame()` is removed from the `IScene` interface and from every scene's constructor and class body. The frame is now Manager's responsibility.

**Files affected:** `Manager.ts`, all 22 scene files (one-line removal each).

### Dependency

```bash
npm install gsap
```

GSAP manages its own RAF loop — no changes needed to the PixiJS ticker.

---

## Section 3 — SceneOne Interaction Fade-ins

### Affected file

`src/SceneOne.ts` only. Other scenes are out of scope for this spec.

### Changes to `showJackal()`

**Click 1 — Jackal appears:**
```ts
const jackal: Sprite = Sprite.from('scene_one/jackal_new.png');
jackal.position.set(1075, 537);
jackal.alpha = 0;
this.mainContainer.addChild(jackal);
gsap.to(jackal, { alpha: 1, duration: 0.3 });
```

**Click 2 — Text1 appears:**
```ts
this.text1.position.set(80, 200);
this.text1.alpha = 0;
this.mainContainer.addChild(this.text1);
gsap.to(this.text1, { alpha: 1, duration: 0.3 });
```

**Click 3 — Text1 out, Text2 in:**
```ts
gsap.to(this.text1, {
    alpha: 0,
    duration: 0.2,
    onComplete: () => this.mainContainer.removeChild(this.text1)
});
this.text2.position.set(720, 45);
this.text2.alpha = 0;
this.mainContainer.addChild(this.text2);
gsap.to(this.text2, { alpha: 1, duration: 0.3 });
```

**Click 4 — Text2 swaps to Text3, rButton appears:**
```ts
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
```

### rButton initialisation change

Replace `this.rButton.visible = false` with `this.rButton.alpha = 0` and `this.rButton.interactive = false` so GSAP can animate it. The button remains non-interactive until click 4.

---

## Out of Scope

- Interaction transitions for scenes other than SceneOne (to be addressed scene by scene in future specs)
- Easing curves (all transitions use GSAP's default `power1.out`)
- Sound effects on transitions
