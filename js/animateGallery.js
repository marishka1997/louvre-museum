const galleryImages = document.querySelectorAll('.gallery-img');

function optimizeFunctionCall(func, period = 20, immediate = true) {
  let timeout;

  return function () {
    const context = this;
    const args = arguments;

    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);
    timeout = setTimeout(later, period);

    if (callNow) func.apply(context, args);
  };
}


function showAnimatedImages(event) {
  galleryImages.forEach((image) => {
    const heightOfScrolling = window.scrollY;
    const imageHeight = image.height;
    const imageOffset = image.getBoundingClientRect();
    const imageOffsetTop = heightOfScrolling + imageOffset.top;
    const imageBottom = imageOffsetTop + imageHeight;
    const imageShouldBeShownFrom = imageOffsetTop - 1.3 * imageHeight;
    const isTimeToShowImage = heightOfScrolling > imageShouldBeShownFrom;
    const isImageNotScrolledToEnd = heightOfScrolling < imageBottom;
    if (isTimeToShowImage && isImageNotScrolledToEnd) {
      image.classList.add('active');
    } else {
      image.classList.remove('active');
    }
  });
}
window.addEventListener('scroll', optimizeFunctionCall(showAnimatedImages, 10));
