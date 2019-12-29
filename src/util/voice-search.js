import { VOICE_NOT_FOUND_WARN } from "../constants";

export default function(haystack, pin) {
  let i = 0, prop, idx, defaultVoice;

  for (; i < haystack.length; i++) {
    for (prop in pin) {
      if (haystack[i].default) {
        defaultVoice = haystack[i];
      }
      if (pin[prop] !== haystack[i][prop]) break;
      idx = i;
    }

    if (idx >= 0) {
      return haystack[idx];
    }
  }

  console.warn(VOICE_NOT_FOUND_WARN.replace(/\$1/, pin.name));

  return defaultVoice;
}
