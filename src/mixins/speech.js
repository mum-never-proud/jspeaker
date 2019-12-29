import { NO_VOICE_ERROR } from '../constants';
import internals from '../priv-data';

export function speak(text) {
  if (!this.currentVoice) {
    throw Error(NO_VOICE_ERROR);
  }

  const utter = new SpeechSynthesisUtterance(text);

  utter.voice = this.currentVoice;

  internals.synth.speak(utter);

  return this;
}

export function cancel() {
  internals.synth.cancel();
}
