import voiceSearch from '../src/util/voice-search';

describe('voice search', function() {
  it('should return the voice when queried by name', function() {
    const result = voiceSearch(global.voices, { name: 'Anna' });
    expect(result.name).toBe('Anna');
  });

  it('should return the voice when queried by lang', function() {
    const result = voiceSearch(global.voices, { lang: 'en-GB' });
    expect(result.lang).toBe('en-GB');
  });

  it('should return default voice', function() {
    const result = voiceSearch(global.voices, { default: true });
    expect(result.default).toBe(true);
  });
});
