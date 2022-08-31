import { Manager } from "./Manager";
import { TitleScene } from "./TitleScene";

Manager.initialize(1920, 1080, 0xcccccc);

const titleScene: TitleScene = new TitleScene();
Manager.changeScene(titleScene);
