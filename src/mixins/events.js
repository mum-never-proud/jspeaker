import { NO_VOICE_ERROR } from "../constants";

export function on() {
  if (!this.currentVoice) {
    throw Error(NO_VOICE_ERROR);
  }

  document.addEventListener('mouseup', this.__textSelectionHandler__);

  return this;
}

export function off() {
  document.removeEventListener('mouseup', this.__textSelectionHandler__);

  return this;
}
