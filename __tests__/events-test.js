describe('events', function() {
  let jSpeaker;

  beforeAll(function() {
    document.body.classList.add('js-jspeaker');
    jSpeaker = require('../src/jSpeaker').default;
  });

  beforeEach(function() {
    jest.resetModules();
  });

  afterEach(function() {
    jSpeaker.off();
  });

  describe('in presence of "js-jspeaker" class', function() {
    afterAll(function() {
      document.body.classList.remove('js-jspeaker');
    });

    beforeEach(function() {
      global.textSelectionHandler.mockClear();
    });

    it('should trigger textSelectionHandler method on mouseup', function() {
      document.dispatchEvent(global.createMouseEvent('mouseup'));

      expect(global.textSelectionHandler).toHaveBeenCalled();
    });

    it('should not trigger textSelectionHandler method after calling "off"', function() {
      jSpeaker.off();
      document.dispatchEvent(global.createMouseEvent('mouseup'));

      expect(global.textSelectionHandler).not.toHaveBeenCalled();
    });

    it('should trigger textSelectionHandler method after calling "on"', function() {
      jSpeaker.off().on();
      document.dispatchEvent(global.createMouseEvent('mouseup'));

      expect(global.textSelectionHandler).toHaveBeenCalled();
    });
  });

  describe('in absence of "js-jspeaker" class', function() {
    beforeEach(function() {
      global.textSelectionHandler.mockClear();
    });

    it('should not trigger textSelectionHandler method on mouseup', function() {
      document.dispatchEvent(global.createMouseEvent('mouseup'));

      expect(global.textSelectionHandler).not.toHaveBeenCalled();
    });
    it('should trigger textSelectionHandler method after calling "init"', function() {
      jSpeaker.init();
      document.dispatchEvent(global.createMouseEvent('mouseup'));

      expect(global.textSelectionHandler).toHaveBeenCalled();
    });
  });

  describe('error', function() {
    beforeEach(function() {
      global.textSelectionHandler.mockClear();
    });

    it('should throw error when on() is called in absence of "currentVoice"', function() {
      expect(jSpeaker.on).toThrow(Error);
    });
  });
});
