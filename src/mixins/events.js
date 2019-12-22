export function on() {
  if (!this.currentVoice) {
    throw Error('jSpeaker doesn\'t has a voice, kindly call init()');
  }

  document.addEventListener('mouseup', this.__textSelectionHandler__);

  return this;
}

export function off() {
  document.removeEventListener('mouseup', this.__textSelectionHandler__);

  return this;
}
