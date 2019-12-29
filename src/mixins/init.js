import internals from '../priv-data';

export default function(voice) {
  const synth = internals.synth;

  if (!synth.onvoiceschanged) {
    synth.onvoiceschanged = () => internals.updateVoices(voice);
  }
  internals.updateVoices(voice);

  return this;
}
