window.speechSynthesis = {
  pending: false,
  speaking: false,
  paused: false,
  onvoiceschanged: null,
  getVoices: function() {
    return global.voices;
  },
  cancel: jest.fn(),
  speak: jest.fn()
};
