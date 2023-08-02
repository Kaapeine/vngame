import { DisplayObject, Sprite, Point, InteractionEvent, Container } from "pixi.js";

export function checkCollision(objA: DisplayObject, objB: DisplayObject): boolean {
    const a = objA.getBounds();
    const b = objB.getBounds();

    const rightmostLeft = a.left < b.left ? b.left : a.left;
    const leftmostRight = a.right > b.right ? b.right : a.right;

    if (leftmostRight <= rightmostLeft) {
        return false;
    }

    const bottommostTop = a.top < b.top ? b.top : a.top;
    const topmostBottom = a.bottom > b.bottom ? b.bottom : a.bottom;

    return topmostBottom > bottommostTop;
}

export class dragSprite {

    public sprite: Sprite;
    public destroyOnCollision: Boolean = true;
    public collisionObj: DisplayObject;

    constructor(path: string, mainContainer: Container, collisionObj: DisplayObject) {
        this.sprite = Sprite.from(path);
        this.sprite.interactive = true;

        this.collisionObj = collisionObj;

        let xoff: number = 0;
        let yoff: number = 0;

        
        let Drag = false;

        this.sprite.on('pointerdown', (e: InteractionEvent) => {
            let globalPos: Point = e.data.global;
            let localPos: Point = mainContainer.toLocal(globalPos);
            xoff = this.sprite.position.x - localPos.x;
            yoff = this.sprite.position.y - localPos.y;
            this.sprite.position.set(localPos.x+xoff, localPos.y+yoff);
            Drag = true;
        })
        this.sprite.on('pointermove', (e: InteractionEvent) => {
            if (Drag) {
                let globalPos: Point = e.data.global;
                let localPos: Point = mainContainer.toLocal(globalPos);
                this.sprite.position.set(localPos.x+xoff, localPos.y+yoff);
            }
        })
        this.sprite.on('pointerup', () => {
            Drag = false;
            if (this.destroyOnCollision) {
                if (checkCollision(this.collisionObj, this.sprite)) {
                    this.sprite.destroy();
                }
            }
        })
    }

}
