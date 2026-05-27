import { LoadingScreen } from './LoadingScreen';
import { Manager } from './Manager';

Manager.initialize(1920, 1080, 0xcccccc);

Manager.changeScene(new LoadingScreen());
