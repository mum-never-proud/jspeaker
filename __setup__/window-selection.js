global.mockWindowSelection = (empty = true) => {
  return {
    getRangeAt: () => empty ? '' : 'Hello',
    rangeCount: 1
  }
};
