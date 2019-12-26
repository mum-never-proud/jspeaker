import * as events from './mixins/events';
import * as speech from './mixins/speech';

import textSelectionHandler from './util/text-selection-handler';
import extend from './util/extend';
import init from './mixins/init';

import { JSPEAKER_CLASS, NO_SPEECH_SYNTH_ERROR } from './constants';

class jSpeaker {
  constructor() {
    this.synth = window.speechSynthesis;

    if (!this.synth) {
      throw Error(NO_SPEECH_SYNTH_ERROR);
    }

    jSpeaker.prototype.__textSelectionHandler__ = textSelectionHandler.bind(this);
    this._voices = this.synth.getVoices();

    if (!this.voices.length) {
      this.synth.onvoiceschanged = () => this._voices = this.synth.getVoices();
    }
  }

  set _voices(voices) {
    this.voices = voices;
    if (voices.length) {
      const jSpeakerElement = document.getElementsByClassName(JSPEAKER_CLASS)[0];

      if (jSpeakerElement) {
        this.init(jSpeakerElement.getAttribute('data-jspeaker-voice'));
      }
    }
  }

  get speaking() {
    return this.synth.speaking;
  }
}

extend(jSpeaker.prototype, { init }, events, speech);

export default new jSpeaker();
