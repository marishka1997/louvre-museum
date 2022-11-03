document.addEventListener('keyup', (event) => {
  const isFormActive = popup.classList.contains('active');


  if (!isFormActive && event.code === 'Space') {
    event.preventDefault();
    event.stopPropagation();
    togglePlay();
  }

  if (!isFormActive && event.code === 'KeyM') {
    toggleVolume();
  }

  if (!isFormActive && event.code === 'KeyF') {
    toggleIsFullscreen();
  }

  if (!isFormActive && event.code === 'Comma' && event.shiftKey) {
    changeVideoRate(FASTER);
  }

  if (!isFormActive && event.code === 'Period' && event.shiftKey) {
    changeVideoRate(SLOWER);
  }

  if (isFormActive && event.code === 'Enter') {
    formSubmitHandler(event);
  }
});
