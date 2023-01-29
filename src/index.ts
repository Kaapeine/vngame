import { Manager } from "./Manager";
import { TitleScene } from "./TitleScene";
// import { Sound } from "@pixi/sound";

Manager.initialize(1920, 1080, 0xcccccc);

Manager.changeScene(new TitleScene);

// let music: Sound = Sound.from('Music/girlstory_loop1.mp3');
// music.play()
// music.loop = true;