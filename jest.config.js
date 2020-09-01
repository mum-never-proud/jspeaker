module.exports = {
  verbose: true,
  resetModules: true,
  resetMocks: true,
  setupFiles: [
    './__mocks__/speech-synthesis.js',
    './__setup__/voices.js',
  ],
  moduleNameMapper: {
    '^jSpeaker$': '<rootDir>/src/jSpeaker.js',
  },
};
