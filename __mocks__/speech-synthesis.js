window.speechSynthesis = {
  pending: false,
  speaking: false,
  paused: false,
  onvoiceschanged: null,
  getVoices: function() {
    return global.voices;
  },
  speak: jest.fn()
};
