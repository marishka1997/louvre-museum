const compareSliderThumb = document.querySelector('.compare-slider-thumb');
const compareImageOverlay = document.querySelector('.compare-overlay');

const compareImages = (imageOverlay, thumb) => {
  const sliderWidth = 720;
  let isClicked = false;

  const slideCompareSlider = (x) => {
    imageOverlay.style.width = x + 'px';
    thumb.style.left = imageOverlay.offsetWidth - thumb.offsetWidth / 2 + 'px';
  };

  const getCursorPosition = (event) => {
    let x = 0;
    event = event || window.event;
    imageOverlayObject = imageOverlay.getBoundingClientRect(); 
    x = event.pageX - imageOverlayObject.left;
    x = x - window.pageXOffset;
    return x;
  };

  const slideMove = (event) => {
    if (!isClicked) return false;
    let position = getCursorPosition(event);
    if (position < 0) position = 0;
    if (position > sliderWidth) position = sliderWidth;
    slideCompareSlider(position);
  };

  const slideReady = (event) => {
    event.preventDefault();
    isClicked = true;
    window.addEventListener('mousemove', slideMove);
    window.addEventListener('touchmove', slideMove);
  };

  const slideFinish = () => {
    isClicked = false;
  };

  thumb.addEventListener('mousedown', slideReady);
  window.addEventListener('mouseup', slideFinish);
  thumb.addEventListener('touchstart', slideReady);
  window.addEventListener('touchstop', slideFinish);
};

compareImages(compareImageOverlay, compareSliderThumb);
