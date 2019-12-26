import { NO_VOICE_ERROR } from "../constants";

export function speak(text) {
  if (!this.currentVoice) {
    throw Error(NO_VOICE_ERROR);
  }

  const utter = new SpeechSynthesisUtterance(text);
  utter.voice = this.currentVoice;

  this.synth.speak(utter);

  return this;
}
