import { Application, Sprite, Container, filters } from 'pixi.js'

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0xcccccc,
	width: 1920,
	height: 1080
});

const bgFrame: Sprite = Sprite.from('frame.png');
titleScreen();
app.stage.addChild(bgFrame); // add frame on top of everything

function titleScreen() {
	const titleContainer: Container = new Container();
  
	const titleBg: Sprite = Sprite.from('title_screen/BG.png');
	titleContainer.addChild(titleBg);
  
	// add leaves here and animate
	const leaves: Sprite = Sprite.from('title_screen/Leaves.png');
	titleContainer.addChild(leaves);
	const leafHueFilter: any  = new filters.ColorMatrixFilter();
	leaves.filters = [leafHueFilter];
  
	// green 1:123, green 2: 167
	// let leavesHue = 0;
	// app.ticker.add( () => {
	//   if (leavesHue == 15) {
	// 	leavesHue = 0;
	//   }
	//   leavesHue += 0.5;
	//   leafHueFilter.hue(leavesHue);
	//   // console.log("hi ", leafColors.saturation);
	// });

	leaves.pivot.set(0.5);
	let angle = 0 * 3.14/180;
	app.ticker.add( () => {
		// angle += 0.1;
		leaves.skew.set(angle);
		// angle += 0.001;
	});
  
	const topBg: Sprite = Sprite.from('title_screen/Front.png');
	titleContainer.addChild(topBg);
	
	titleContainer.position.x = 150;
	titleContainer.position.y = 150;
  
	app.stage.addChild(titleContainer);
  }
