import * as events from './mixins/events';
import * as speech from './mixins/speech';
import init from './mixins/init';

import textSelectionHandler from './util/text-selection-handler';
import updateVoices from './util/update-voices';
import extend from './util/extend';

import { JSPEAKER_CLASS, NO_SPEECH_SYNTH_ERROR } from './constants';
import internals from './priv-data';

class jSpeaker {
  constructor() {
    internals.synth = window.speechSynthesis;

    if (!internals.synth) {
      throw Error(NO_SPEECH_SYNTH_ERROR);
    }

    internals.textSelectionHandler = textSelectionHandler.bind(this);
    internals.updateVoices = updateVoices.bind(this);

    const jSpeakerElement = document.getElementsByClassName(JSPEAKER_CLASS)[0];

    if (jSpeakerElement) {
      this.init(jSpeakerElement.getAttribute('data-jspeaker-voice'));
    }
  }

  get speaking() {
    return internals.synth.speaking;
  }
}

extend(jSpeaker.prototype, { init }, events, speech);

export default new jSpeaker();
