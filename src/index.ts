// import { IntroScene } from "./IntroScene";
import { Manager } from "./Manager";
// import { TitleScene } from "./TitleScene";
import { SceneSeven } from "./SceneSeven";
// import { TitleScene } from "./TitleScene";

Manager.initialize(1920, 1080, 0xcccccc);

Manager.changeScene(new SceneSeven);
