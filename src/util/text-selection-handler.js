import { BUFFER_TIME } from '../constants';

let buffer;

export default function() {
  window.clearTimeout(buffer);

  buffer = window.setTimeout(() => {
    const selection = window.getSelection();

    this.cancel();

    if (selection.rangeCount) {
      const text = selection.getRangeAt(0).toString().trim();

      if (text) {
        this.speak(text);
      }
    }
  }, BUFFER_TIME);
}
