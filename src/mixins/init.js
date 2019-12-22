import voiceSearch from '../util/voice-search';

export default function(voice) {
  this.currentVoice = voiceSearch(this.voices, voice ? { name: voice } : { default: true });

  this.on();

  return this;
}
