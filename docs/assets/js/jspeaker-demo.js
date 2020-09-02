(function jSpeakerDemo() {
  const spinner = document.querySelector('.spinner');

  if (!window.$j) {
    spinner.style.display = 'none';
    // eslint-disable-next-line no-alert
    alert('Whooops, looks like this browser doesn\'t support Speech to Text feature');

    return;
  }

  const controlsWrapper = document.querySelector('#controls-wrapper');
  const speechStatus = document.querySelector('#speech-status');
  const timeElapsed = document.querySelector('#time-elapsed');
  const spoken = document.querySelector('#words-spoken');
  const getControlsSvgItem = () => controlsWrapper.children[0].children[0];
  const toggleControl = (href) => (href === '#img-play' ? '#img-stop' : '#img-play');
  const showControls = () => {
    controlsWrapper.style.display = 'block';
    spinner.style.display = 'none';
  };
  const jSpeaker = new window.$j({
    events: {
      onVoicesUpdate: showControls,
      onBoundary: (e) => {
        timeElapsed.innerHTML = e.elapsedTime.toFixed(2);
        spoken.innerHTML = e.wordIndex;
      },
      onEnd: () => getControlsSvgItem().setAttribute('href', '#img-play'),
    },
  });

  /*
   * some browsers just don't send events but they do support STT feature
   * in such case hide spinner after 5s
   */

  window.setTimeout(showControls, 5000);

  controlsWrapper.addEventListener('click', () => {
    const oldSvgItem = getControlsSvgItem();
    const newSvgID = toggleControl(oldSvgItem.getAttribute('href'));

    if (newSvgID === '#img-stop') {
      speechStatus.style.opacity = '1';
      jSpeaker.speak(document.querySelector('.card-body.story').innerText);
    } else {
      jSpeaker.cancel();
    }

    oldSvgItem.setAttribute('href', newSvgID);
  });
  window.addEventListener('beforeunload', () => jSpeaker.cancel());
}());
