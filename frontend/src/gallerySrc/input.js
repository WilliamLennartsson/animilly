export class InputController {
  constructor() {
    this._Init();
  }

  _Init() {
    this._keys = {
      forward: false,
      backward: false,
      left: false,
      right: false,
      space: false,
      shift: false,
    };
    document.addEventListener("keydown", (e) => this._onKeyDown(e), false);
    document.addEventListener("keyup", (e) => this._onKeyUp(e), false);
  }

  _onKeyDown(event) {
    console.log(`this.keys`, this.keys)
    switch (event.code) {
      case "KeyW": // w
        this._keys.forward = true;
        break;
      case "KeyA": // a
        this._keys.left = true;
        break;
      case "KeyS": // s
        this._keys.backward = true;
        break;
      case "KeyD": // d
        this._keys.right = true;
        break;
      case "Space": // SPACE
        this._keys.space = true;
        break;
      case "ShiftRight":
      case "ShiftLeft": // SHIFT
        this._keys.shift = true;
        break;
    }
  }

  _onKeyUp(event) {
    switch (event.code) {
      case "KeyW": // w
        this._keys.forward = false;
        break;
      case "KeyA": // a
        this._keys.left = false;
        break;
      case "KeyS": // s
        this._keys.backward = false;
        break;
      case "KeyD": // d
        this._keys.right = false;
        break;
      case "Space": // SPACE
        this._keys.space = false;
        break;
      case "ShiftRight": // SHIFT
      case "ShiftLeft":
        this._keys.shift = false;
        break;
    }
  }
}
