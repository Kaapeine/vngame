import { Manager } from "./Manager";
// import { Scene13 } from "./Scene13";
// import { LoadingScreen } from "./LoadingScreen";
import { Scene14 } from "./Scene14";
// import { TitleScene } from "./TitleScene";
// import { Sound } from "@pixi/sound";

Manager.initialize(1920, 1080, 0xcccccc);

Manager.changeScene(new Scene14);

// let music: Sound = Sound.from('Music/girlstory_loop1.mp3');
// music.play()
// music.loop = true;