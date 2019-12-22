export function speak(text) {
  const utter = new SpeechSynthesisUtterance(text);
  utter.voice = this.currentVoice;

  this.synth.speak(utter);

  return this;
}
