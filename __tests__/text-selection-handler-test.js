const BUFFER_TIME = 400;

describe('text selection handler', function() {
  let jSpeaker;

  beforeEach(function() {
    jest.resetModules();
    jSpeaker = require('../src/jSpeaker').default
    jSpeaker.speak = jest.fn();
    jSpeaker.cancel = jest.fn();
    window.getSelection.mockClear();
  });

  it('should start speaking when text is not empty', function(done) {
    window.getSelection.mockImplementation(() => global.mockWindowSelection(false));
    jSpeaker.init();
    document.dispatchEvent(global.createMouseEvent('mouseup'));

    window.setTimeout(() => {
      expect(jSpeaker.speak).toHaveBeenCalled();
      done();
    }, BUFFER_TIME);
  });

  it('should not speak when text is empty', function(done) {
    window.getSelection.mockImplementation(global.mockWindowSelection);
    jSpeaker.init();
    document.dispatchEvent(global.createMouseEvent('mouseup'));

    window.setTimeout(() => {
      expect(jSpeaker.speak).not.toHaveBeenCalled();
      done();
    }, BUFFER_TIME);
  });

  it('should cancel speaking if the text is empty', function(done) {
    window.getSelection.mockImplementation(() => global.mockWindowSelection(false));
    jSpeaker.init();
    document.dispatchEvent(global.createMouseEvent('mouseup'));

    window.setTimeout(() => {
      expect(jSpeaker.speak).toHaveBeenCalled();

      window.getSelection.mockImplementation(global.mockWindowSelection);
      document.dispatchEvent(global.createMouseEvent('mouseup'));

      window.setTimeout(() => {
        expect(jSpeaker.cancel).toHaveBeenCalled();
        done();
      }, BUFFER_TIME);
    }, BUFFER_TIME);
  });
});
