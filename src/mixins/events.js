import { NO_VOICE_ERROR } from '../constants';
import internals from '../priv-data';

let isListening;

export function on() {
  if (!this.currentVoice) {
    throw Error(NO_VOICE_ERROR);
  }

  if (!isListening) {
    document.addEventListener('mouseup', internals.textSelectionHandler);
    isListening = true;
  }

  return this;
}

export function off() {
  document.removeEventListener('mouseup', internals.textSelectionHandler);
  isListening = false;

  return this;
}
