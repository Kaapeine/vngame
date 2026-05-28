import { Loader } from 'pixi.js';
import { IScene, Manager } from './Manager';
import { LoadingScreen } from './LoadingScreen';
import { TitleScene } from './TitleScene';
import { IntroScene } from './IntroScene';
import { SceneOne } from './SceneOne';
import { SceneTwo } from './SceneTwo';
import { SceneThree } from './SceneThree';
import { SceneFour } from './SceneFour';
import { SceneFive } from './SceneFive';
import { SceneSix } from './SceneSix';
import { SceneSeven } from './SceneSeven';
import { Scene8 } from './Scene8';
import { Scene9 } from './Scene9';
import { Scene10 } from './Scene10';
import { Scene11 } from './Scene11';
import { Scene12 } from './Scene12';
import { Scene13 } from './Scene13';
import { Scene14 } from './Scene14';
import { Scene15 } from './Scene15';
import { Scene16 } from './Scene16';
import { Scene17 } from './Scene17';
import { EndScene } from './EndScene';
import { Credits } from './Credits';

const SCENE_MAP: Record<number, () => IScene> = {
    0:  () => new TitleScene(),
    1:  () => new SceneOne(),
    2:  () => new SceneTwo(),
    3:  () => new SceneThree(),
    4:  () => new SceneFour(),
    5:  () => new SceneFive(),
    6:  () => new SceneSix(),
    7:  () => new SceneSeven(),
    8:  () => new Scene8(),
    9:  () => new Scene9(),
    10: () => new Scene10(),
    11: () => new Scene11(),
    12: () => new Scene12(),
    13: () => new Scene13(),
    14: () => new Scene14(),
    15: () => new Scene15(),
    16: () => new Scene16(),
    17: () => new Scene17(),
    18: () => new EndScene(),
    19: () => new Credits(),
    20: () => new IntroScene(),
};

Manager.initialize(1920, 1080);

const params = new URLSearchParams(window.location.search);
const sceneParam = params.get('scene');
const sceneNum = sceneParam !== null ? parseInt(sceneParam, 10) : NaN;
const startScene = !isNaN(sceneNum) && SCENE_MAP[sceneNum] ? SCENE_MAP[sceneNum] : null;

// Preload the loading screen's own assets so they all appear at once (not one-by-one)
const LOADING_SCREEN_ASSETS = [
    'intro_scene/Intro.jpg',
    'intro_scene/firefly/firefly-1.png',
    'intro_scene/firefly/firefly-2.png',
    'intro_scene/firefly/firefly-3.png',
    'intro_scene/firefly/firefly-4.png',
    'intro_scene/firefly/firefly-5.png',
    'loading/LoadingCircle.png',
    'loading/LoadingText.png',
    'frame.png',
];

Loader.shared.add(LOADING_SCREEN_ASSETS).load(() => {
    Manager.initStage();
    Manager.changeScene(new LoadingScreen(startScene));
});
