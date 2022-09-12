import { Manager } from "./Manager";
// import { SceneOne } from "./SceneOne";
import { TitleScene } from "./TitleScene";

Manager.initialize(1920, 1080, 0xcccccc);

const titleScene: TitleScene = new TitleScene();
Manager.changeScene(titleScene);

// // const scene: SceneOne = new SceneOne();
// Manager.changeScene(new SceneOne);
