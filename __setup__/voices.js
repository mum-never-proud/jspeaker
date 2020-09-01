function SpeechSynthesisVoice(obj) {
  Object.keys(obj).forEach((key) => {
    this[key] = obj[key];
  });

  return this;
}

const voicesData = Object.freeze([
  {
    voiceURI: 'Veena', name: 'Veena', lang: 'en-IN', localService: true, default: true,
  },
  {
    voiceURI: 'Alex', name: 'Alex', lang: 'en-US', localService: true, default: false,
  },
  {
    voiceURI: 'Alice', name: 'Alice', lang: 'it-IT', localService: true, default: false,
  },
  {
    voiceURI: 'Alva', name: 'Alva', lang: 'sv-SE', localService: true, default: false,
  },
  {
    voiceURI: 'Amelie', name: 'Amelie', lang: 'fr-CA', localService: true, default: false,
  },
  {
    voiceURI: 'Anna', name: 'Anna', lang: 'de-DE', localService: true, default: false,
  },
  {
    voiceURI: 'Carmit', name: 'Carmit', lang: 'he-IL', localService: true, default: false,
  },
  {
    voiceURI: 'Damayanti', name: 'Damayanti', lang: 'id-ID', localService: true, default: false,
  },
  {
    voiceURI: 'Daniel', name: 'Daniel', lang: 'en-GB', localService: true, default: false,
  },
  {
    voiceURI: 'Diego', name: 'Diego', lang: 'es-AR', localService: true, default: false,
  },
  {
    voiceURI: 'Ellen', name: 'Ellen', lang: 'nl-BE', localService: true, default: false,
  },
]);

global.voices = voicesData.map((voiceData) => new SpeechSynthesisVoice(voiceData));
