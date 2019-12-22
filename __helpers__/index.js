global.createMouseEvent = eventType => {
  return new MouseEvent(eventType, {});
};

global.mockWindowSelection = (empty = true) => {
  return {
    getRangeAt: () => empty ? '' : 'Hello',
    rangeCount: 1
  }
};
