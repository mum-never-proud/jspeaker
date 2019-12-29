import voiceSearch from './voice-search';
import internals from '../priv-data';

export default function(voice) {
  const synth = internals.synth;

  this.voices = synth.getVoices();
  if (this.voices.length) {
    this.currentVoice = voiceSearch(this.voices, { name: voice });
    this.on();
  }
};
