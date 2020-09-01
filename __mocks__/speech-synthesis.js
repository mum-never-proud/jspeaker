window.speechSynthesis = {
  pending: false,
  speaking: false,
  paused: false,
  onboundary: null,
  onvoiceschanged: null,
  getVoices() {
    return global.voices;
  },
  cancel: jest.fn(),
  speak: jest.fn(),
};

window.SpeechSynthesisUtterance = function SpeechSynthesisUtterance() {
  const methods = {
    onend: null,
    onboundary: null,
  };

  global.triggerUtteranceEnd = () => methods.onend();
  global.triggerUtteranceBoundary = () => methods.onboundary({
    charIndex: 1,
    elapsedTime: Math.random(),
    wordIndex: 1,
  });

  return methods;
};
