import { Container, Texture, Sprite, AnimatedSprite, Point, InteractionEvent, Loader } from "pixi.js";
import { IScene, Manager } from "./Manager";
import { TitleScene } from "./TitleScene";
import { ASSETS } from "./assets";

export class LoadingScreen extends Container implements IScene {

  private mainContainer: Container = new Container();
  private cursorFirefly: AnimatedSprite;
  private spinner: Sprite;

  constructor() {
    super();

    Manager.loop1.play();
    Manager.loop2.stop();

    const fireflySeq: Array<string> = [
      'intro_scene/firefly/firefly-1.png',
      'intro_scene/firefly/firefly-2.png',
      'intro_scene/firefly/firefly-3.png',
      'intro_scene/firefly/firefly-4.png',
      'intro_scene/firefly/firefly-5.png',
    ];
    const fireflyTextureSeq: Array<Texture> = [];
    for (let i = 0; i < fireflySeq.length; i++) {
      fireflyTextureSeq.push(Texture.from(fireflySeq[i]));
    }
    this.cursorFirefly = new AnimatedSprite(fireflyTextureSeq);
    this.cursorFirefly.play();
    this.cursorFirefly.animationSpeed = 0.05;

    this.mainContainer.position.set(148, 150);
    this.mainContainer.addChild(this.cursorFirefly);
    this.mainContainer.interactive = true;
    this.mainContainer.on('pointermove', this.moveCursorFirefly, this);

    this.spinner = Sprite.from('loading/LoadingCircle.png');
    this.spinner.anchor.set(0.5);
    this.spinner.position.set(811, 488);
    this.mainContainer.addChild(this.spinner);

    const loadingText: Sprite = Sprite.from('loading/LoadingText.png');
    loadingText.position.set(725, 300);
    this.mainContainer.addChild(loadingText);

    this.addChild(this.mainContainer);
    this.addFrame();

    Loader.shared.add(ASSETS).load(() => {
      Manager.changeScene(new TitleScene());
    });
  }

  public update(_delta: number): void {
    this.cursorFirefly.x += 2 * Math.random() * (Math.round(Math.random()) * 2 - 1);
    this.cursorFirefly.y += 2 * Math.random() * (Math.round(Math.random()) * 2 - 1);
    this.spinner.rotation += 0.05;
  }

  public moveCursorFirefly(e: InteractionEvent): void {
    const globalPos: Point = e.data.global;
    const localPos: Point = this.mainContainer.toLocal(globalPos);
    this.cursorFirefly.position.set(localPos.x - 20, localPos.y + 20);
  }

  public goNext(_event: Event): void {}
  public goPrev(_event: Event): void {}

  public addFrame(): void {
    const bgFrame: Sprite = Sprite.from('frame.png');
    this.addChild(bgFrame);
  }
}
