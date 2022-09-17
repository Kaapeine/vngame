import { IntroScene } from "./IntroScene";
import { Manager } from "./Manager";
// import { SceneOne } from "./SceneOne";
// import { TitleScene } from "./TitleScene";

Manager.initialize(1920, 1080, 0xcccccc);

// const titleScene: TitleScene = new TitleScene();
// Manager.changeScene(titleScene);

// Manager.changeScene(new SceneOne);

Manager.changeScene(new IntroScene);
