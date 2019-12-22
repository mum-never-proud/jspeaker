export default function(target, ...sources) {
  let i = 0, len = sources.length, prop;

  for (; i < len; i++) {
    for (prop in sources[i]) {
      target[prop] = sources[i][prop];
    }
  }

  return target;
}
