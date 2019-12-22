describe('jspeaker', function() {
  beforeEach(function() {
    jest.resetModules();
  });

  it('should initialize jSpeaker if browser supports speech synthesis', function() {
    require('../src/jSpeaker').default
    expect.objectContaining({
      pending: false,
      speaking: false,
      paused: false
    })
  });

  it('should throw error if browser doesn\'t supports speech synthesis', function() {
    delete window.speechSynthesis;

    let errorMessage;

    try {
      require('../src/jSpeaker').default;
    } catch(e) {
      errorMessage = e.toString();
    }

    expect(errorMessage).toEqual('Error: speech synthesis not supported in this browser');
  });
});
