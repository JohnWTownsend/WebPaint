export class Canvas{
    element: HTMLElement;
    ctx: CanvasRenderingContext2D;
    constructor(public queryString: string){
        this.element = <HTMLElement>document.querySelector(queryString);
        this.ctx = this.element.getContext("2d");
    }
    public fillCanvas() {
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.element.width, this.element.height);
    }
}