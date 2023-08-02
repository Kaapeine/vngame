import { Manager } from "./Manager";
// import { Scene13 } from "./Scene13";
import { LoadingScreen } from "./LoadingScreen";
// import { SceneSeven } from "./SceneSeven";
// import { TitleScene } from "./TitleScene";
// import { Sound } from "@pixi/sound";

Manager.initialize(1920, 1080, 0xcccccc);

Manager.changeScene(new LoadingScreen);

// let music: Sound = Sound.from('Music/girlstory_loop1.mp3');
// music.play()
// music.loop = true;