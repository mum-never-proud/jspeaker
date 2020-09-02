(function jSpeakerDemo() {
  const controlsWrapper = document.querySelector('#controls-wrapper');
  const speechStatus = document.querySelector('#speech-status');
  const timeElapsed = document.querySelector('#time-elapsed');
  const spoken = document.querySelector('#words-spoken');
  const getControlsSvgItem = () => controlsWrapper.children[0].children[0];
  const toggleControl = (href) => (href === '#img-play' ? '#img-stop' : '#img-play');
  const jSpeaker = new window.$j({
    events: {
      onBoundary: (e) => {
        timeElapsed.innerHTML = (e.elapsedTime / 1000.00).toFixed(2);
        spoken.innerHTML = e.wordIndex;
      },
      onEnd: () => getControlsSvgItem().setAttribute('href', '#img-play'),
    },
  });

  controlsWrapper.addEventListener('click', () => {
    const oldSvgItem = getControlsSvgItem();
    const newSvgID = toggleControl(oldSvgItem.getAttribute('href'));

    if (newSvgID === '#img-stop') {
      speechStatus.style.opacity = '1';
      jSpeaker.speak(document.querySelector('.card-body.story').textContent);
    } else {
      jSpeaker.cancel();
    }

    oldSvgItem.setAttribute('href', newSvgID);
  });
  window.addEventListener('beforeunload', () => jSpeaker.cancel());
}());
