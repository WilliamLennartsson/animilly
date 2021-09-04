import { WorldObject } from "./Entity"

type Key = {
  [key: string]: boolean
}

type SubscriptionEvent = () => void
type Subscriptions = {
  [key: string]: SubscriptionEvent
}

class InputManager implements WorldObject{
  private keys: Key = {}
  private subscriptions: Subscriptions = {}

  constructor() {
    this.init()
  }

  init() {
    window.addEventListener('keydown', this.handleKeyDown.bind(this))
    window.addEventListener('keyup', this.handleKeyUp.bind(this))
  }
  cleanup() {
    window.removeEventListener('keydown', this.handleKeyDown.bind(this))
    window.removeEventListener('keyup', this.handleKeyUp.bind(this))
  }

  subscribe(code: string, event: SubscriptionEvent) {
    this.subscriptions[code] = event
  }
  unsubscribe(code: string) {
    if (this.subscriptions[code])
      delete this.subscriptions[code]
  }

  get getKeys(){
    return this.keys
  }
  
  private handleKeyDown(e: KeyboardEvent) {
    // console.log(`Keydown. e.code ->`, e.code)
    this.keys[e.code] = true
    const subEvent = this.subscriptions[e.code]
    if (subEvent) {
      subEvent()
    }
  }

  private handleKeyUp(e: KeyboardEvent) {
    // console.log(`Keyup. e.code ->`, e.code)
    this.keys[e.code] = false
  }

  update(delta: number) {}
  
}

export default InputManager