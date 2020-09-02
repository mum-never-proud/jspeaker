(function $j(w, m) {
  if (!w.speechSynthesis || !w.SpeechSynthesisUtterance) {
    // eslint-disable-next-line no-console
    console.warn('speech synthesis is not available');

    m.exports = null;

    return;
  }

  const isEachPropertyMatched = (obj1, obj2) => {
    if (!obj1 || !obj2) {
      return false;
    }

    const keys = Object.keys(obj1);

    for (let i = 0; i < keys.length; i += 1) {
      if (String(obj1[keys[i]]).toLowerCase() !== String(obj2[keys[i]]).toLowerCase()) {
        return false;
      }
    }

    return true;
  };

  function jSpeaker(customConfig = {}) {
    const { speechSynthesis } = window;
    const utter = new SpeechSynthesisUtterance();
    const config = {
      events: {},
      currentVoice: null,
      ...customConfig,
      voices: [],
    };
    const isCallbackRegistered = (callbackName) => typeof config.events[callbackName] === 'function';
    let wordIndex = 0;

    utter.onend = () => {
      if (isCallbackRegistered('onEnd')) {
        config.events.onEnd();
      }
    };

    utter.onboundary = (e) => {
      if (isCallbackRegistered('onBoundary')) {
        config.events.onBoundary({
          charIndex: e.charIndex,
          elapsedTime: e.elapsedTime,
          wordIndex,
        });

        wordIndex += 1;
      }
    };

    // to make sure safari doesn't screws up

    speechSynthesis.onvoiceschanged = () => {
      config.voices = speechSynthesis.getVoices();
      config.currentVoice = this.voiceSearch();

      if (isCallbackRegistered('onVoicesUpdate')) {
        config.events.onVoicesUpdate(config.voices);
      }
    };

    this.speak = (sentence) => {
      utter.text = sentence;
      utter.voice = config.currentVoice;
      wordIndex = 0;

      speechSynthesis.speak(utter);

      return this;
    };

    this.cancel = () => {
      speechSynthesis.cancel();

      return this;
    };

    this.setVoice = (voice) => {
      if (voice && voice.constructor.name === 'SpeechSynthesisVoice') {
        config.currentVoice = voice;
      } else {
        config.currentVoice = this.voiceSearch(voice) || config.currentVoice;
      }

      return this;
    };

    this.voiceSearch = (prop) => {
      for (let i = 0; i < config.voices.length; i += 1) {
        if ((!prop && config.voices[i].default)
          || isEachPropertyMatched(prop, config.voices[i])) {
          return config.voices[i];
        }
      }

      return null;
    };

    return this;
  }

  m.exports = jSpeaker;
}(window, module));
