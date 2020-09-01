/* eslint-disable global-require */
/* eslint-disable no-console */
describe('jspeaker', () => {
  const nativeConsoleWarn = console.warn;

  beforeEach(() => {
    console.warn = jest.fn();
  });

  afterEach(() => {
    console.warn = nativeConsoleWarn;
  });

  describe('in supported browsers', () => {
    const $j = require('jSpeaker');

    it('should initialize jSpeaker when speechSynthesis and SpeechSynthesisUtterance is supported in the browser', () => {
      expect(console.warn).not.toBeCalled();
      expect(typeof $j).toEqual('function');
    });

    it('should call respective registered callbacks', () => {
      const events = {
        onEnd: jest.fn(),
        onBoundary: jest.fn(),
        onVoicesUpdate: jest.fn(),
      };

      // eslint-disable-next-line no-new
      new $j({ events });

      global.triggerUtteranceEnd();
      global.triggerUtteranceBoundary();
      window.speechSynthesis.onvoiceschanged();

      expect(events.onEnd).toBeCalled();
      expect(events.onVoicesUpdate).toBeCalled();
      expect(events.onBoundary).toBeCalledWith(
        expect.objectContaining({
          charIndex: expect.any(Number),
          elapsedTime: expect.any(Number),
          wordIndex: expect.any(Number),
        }),
      );
    });

    it('should call respective speechSynthesis methods', () => {
      const jSpeaker = new $j();

      jSpeaker.speak('Hello');
      jSpeaker.cancel();

      expect(window.speechSynthesis.speak).toBeCalled();
      expect(window.speechSynthesis.cancel).toBeCalled();
    });

    it('should call searchVoice method on calling serVoice with search param', () => {
      const jSpeaker = new $j();

      jSpeaker.voiceSearch = jest.fn();
      jSpeaker.setVoice({ name: 'Alice' });

      expect(jSpeaker.voiceSearch).toBeCalled();
    });

    it('should not call searchVoice method on calling serVoice with SpeechSythesisVoice as search param', () => {
      const jSpeaker = new $j();

      jSpeaker.voiceSearch = jest.fn();
      jSpeaker.setVoice(global.voices[1]);

      expect(jSpeaker.voiceSearch).not.toBeCalled();
    });

    it('should return null when no SpeechSythesisVoice is found on search', () => {
      const jSpeaker = new $j();

      window.speechSynthesis.onvoiceschanged();

      expect(jSpeaker.voiceSearch({ some: 'junk' })).toEqual(null);
    });

    it('should return SpeechSythesisVoice on search', () => {
      const jSpeaker = new $j();

      window.speechSynthesis.onvoiceschanged();

      expect(jSpeaker.voiceSearch({ name: 'Veena' })).toMatchObject(global.voices[0]);
    });
  });

  describe('in unsupported browsers', () => {
    const nativeSpeechSynthesis = window.speechSynthesis;
    const nativeSpeechSynthesisUtterance = window.SpeechSynthesisUtterance;

    afterAll(() => {
      window.speechSynthesis = nativeSpeechSynthesis;
      window.SpeechSynthesisUtterance = nativeSpeechSynthesisUtterance;
    });

    it('show warn if browser lacks support for speechSynthesis', () => {
      delete window.speechSynthesis;

      require('jSpeaker');

      expect(console.warn).toBeCalled();
    });

    it('show warn if browser lacks support for SpeechSynthesisUtterance', () => {
      delete window.SpeechSynthesisUtterance;

      require('jSpeaker');

      expect(console.warn).toBeCalled();
    });
  });
});
