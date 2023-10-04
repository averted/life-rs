import { memory } from "life-rs/life_bg";
import { Universe, Cell } from "life-rs";

const CELL_SIZE = 8;
const GRID_COLOR = "#D9D9D9";
const DEAD_COLOR = "#FFFFFF";
const ALIVE_COLOR = "#000000";

const universe = Universe.new();
const width = universe.width();
const height = universe.height();

export default class Renderer {
  constructor(node) {
    this.node = node;
    this.ctx = this.node.getContext('2d');
    this.initCanvas();
  }

  initCanvas() {
    this.node.height = (CELL_SIZE + 1) * height + 1;
    this.node.width = (CELL_SIZE + 1) * width + 1;

    this.node.addEventListener("click", event => {
      const boundingRect = this.node.getBoundingClientRect();

      const scaleX = this.node.width / boundingRect.width;
      const scaleY = this.node.height / boundingRect.height;

      const canvasLeft = (event.clientX - boundingRect.left) * scaleX;
      const canvasTop = (event.clientY - boundingRect.top) * scaleY;

      const row = Math.min(Math.floor(canvasTop / (CELL_SIZE + 1)), height - 1);
      const col = Math.min(Math.floor(canvasLeft / (CELL_SIZE + 1)), width - 1);

      universe.toggle_cell(row, col);
      this.draw();
    });
  }

  render() {
    this.draw();
    universe.tick();
  }

  draw() {
    this.drawGrid()
    this.drawCells()
  }

  getIndex(row, column) {
    return row * width + column;
  }

  drawGrid() {
    this.ctx.beginPath();
    this.ctx.strokeStyle = GRID_COLOR;

    for (let i = 0; i <= width; i++) {
      this.ctx.moveTo(i * (CELL_SIZE + 1) + 1, 0);
      this.ctx.lineTo(i * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * height + 1);
    }

    for (let j = 0; j <= height; j++) {
      this.ctx.moveTo(0,                           j * (CELL_SIZE + 1) + 1);
      this.ctx.lineTo((CELL_SIZE + 1) * width + 1, j * (CELL_SIZE + 1) + 1);
    }

    this.ctx.stroke();
  }

  drawCells() {
    const cells = new Uint8Array(memory.buffer, universe.cells(), width * height);

    this.ctx.beginPath();

    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        const idx = this.getIndex(row, col);

        this.ctx.fillStyle = cells[idx] === Cell.Dead
          ? DEAD_COLOR
          : ALIVE_COLOR;

        this.ctx.fillRect(
          col * (CELL_SIZE + 1) + 1,
          row * (CELL_SIZE + 1) + 1,
          CELL_SIZE,
          CELL_SIZE
        );
      }
    }

    this.ctx.stroke();
  }
}
