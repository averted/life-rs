import Renderer from './renderer'

export default class Life {
  constructor() {
    this.renderer = new Renderer(document.getElementById("life-canvas"));
    this.interval = null;
    this.initActions();
  }

  initActions() {
    this.buttons = {
      play: document.getElementById("play-pause")
    }

    this.buttons.play.addEventListener("click", () => {
      if (this.isPaused()) {
        this.play();
      } else {
        this.pause();
      }
    });
  }

  play() {
    this.buttons.play.textContent = "⏸";
    this.renderer.render();
    this.interval = setInterval(() => requestAnimationFrame(this.renderer.render.bind(this.renderer)), 200)
  }

  pause() {
    this.buttons.play.textContent = "▶";
    clearInterval(this.interval);
    this.interval = null;
  }

  isPaused() {
    return this.interval === null
  }
}
