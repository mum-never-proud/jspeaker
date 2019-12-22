describe('text selection handler', function() {
  let jSpeaker;

  beforeEach(function() {
    jest.resetModules();
    jSpeaker = require('../src/jSpeaker').default
    jSpeaker.speak = jest.fn();
    window.getSelection.mockClear();
  });

  it('should start speaking when text is not empty', function(done) {
    window.getSelection.mockImplementation(() => global.mockWindowSelection(false));
    jSpeaker.init();
    document.dispatchEvent(global.createMouseEvent('mouseup'));

    window.setTimeout(() => {
      expect(jSpeaker.speak).toHaveBeenCalled();
      done();
    }, 400);
  });

  it('should not start speaking when text is empty', function(done) {
    window.getSelection.mockImplementation(global.mockWindowSelection);
    jSpeaker.init();
    document.dispatchEvent(global.createMouseEvent('mouseup'));

    window.setTimeout(() => {
      expect(jSpeaker.speak).not.toHaveBeenCalled();
      done();
    }, 400);
  });
});
