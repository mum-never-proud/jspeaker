window.speechSynthesis = {
  pending: false,
  speaking: false,
  paused: false,
  onvoiceschanged: null,
  getVoices: function() {
    return [
      {voiceURI: 'Veena', name: 'Veena', lang: 'en-IN', localService: true, default: true}
    ];
  },
  speak: jest.fn()
};
