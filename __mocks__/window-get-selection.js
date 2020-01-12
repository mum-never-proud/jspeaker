window.getSelection =  jest.fn().mockImplementation(() => {
  return {
    getRangeAt: jest.fn(),
    rangeCount: 1
  }
});
