// import { IntroScene } from "./IntroScene";
import { Manager } from "./Manager";
// import { TitleScene } from "./TitleScene";
import { Scene10 } from "./Scene10";
// import { TitleScene } from "./TitleScene";

Manager.initialize(1920, 1080, 0xcccccc);

Manager.changeScene(new Scene10);
