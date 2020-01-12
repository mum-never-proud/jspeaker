module.exports = {
  verbose: true,
  setupFiles: [
    './__mocks__/speech-synthesis.js',
    './__mocks__/window-get-selection.js',
    './__mocks__/text-selection-handler.js',
    './__setup__/voices.js',
    './__setup__/window-selection.js',
    './__setup__/create-mouse-event.js',
  ]
};
