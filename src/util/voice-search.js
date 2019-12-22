export default function(haystack, pin) {
  let i = 0, prop, idx;

  for (; i < haystack.length; i++) {
    for (prop in pin) {
      if (pin[prop] !== haystack[i][prop]) break;
      idx = i;
    }

    if (idx >= 0) {
      return haystack[idx];
    }
  }
}
