const videoSlidesWrap = document.querySelector('.videos');
const videoSlides = document.querySelectorAll('.video-slide');
const videoPrevBtn = document.querySelector('.video-slider-prev');
const videoNextBtn = document.querySelector('.video-slider-next');
const videoDots = document.querySelectorAll('.video-slider-dot');

const mainVideo = document.querySelector('.video');


const slideVideo = (wrapper, slides, prevBtn, nextBtn, dots, video) => {
  let posX1 = 0;
  let posX2 = 0;
  let posInitial = 0;
  let posFinal = 0;
  const slidesLength = slides.length;
  const dotsLength = dots.length;
  const slideWidth = slides[0].offsetWidth; // ширина одного слайда
  let index = 0;
  let allowShift = true;

  
  const firstSlide = slides[0];
  const secondSlide = slides[1];
  const preLastSlide = slides[slidesLength - 2];
  const lastSlide = slides[slidesLength - 1];
  const cloneFirst = firstSlide.cloneNode(true);
  const cloneSecond = secondSlide.cloneNode(true);
  const clonePreLast = preLastSlide.cloneNode(true);
  const cloneLast = lastSlide.cloneNode(true);
  wrapper.appendChild(cloneFirst);
  wrapper.appendChild(cloneSecond);
  wrapper.insertBefore(cloneLast, firstSlide);
  wrapper.insertBefore(clonePreLast, cloneLast);

  const shiftSlide = (shiftTo) => {
    wrapper.classList.add('shifting'); 

    if (index >= 0 && index < dotsLength) {
      dots[index].classList.remove('active');
    }

    if (allowShift) {
      posInitial = wrapper.offsetLeft;

      const difference = index - shiftTo;
      index = shiftTo;
      wrapper.style.left = posInitial + difference * slideWidth + 'px';
    }


    if (index >= 0 && index < dotsLength) {
      dots[index].classList.add('active');
    }
    if (index < 0) {
      dots[dotsLength - 1].classList.add('active');
    }
    if (index >= dotsLength) {
      dots[0].classList.add('active');
    }

    allowShift = false;
  };

 
  const checkIndex = () => {
    wrapper.classList.remove('shifting');

    if (index === -1) {
      wrapper.style.left = -((slidesLength + 1) * slideWidth) + 'px';
      index = slidesLength - 1;
    }

    if (index === slidesLength) {
      wrapper.style.left = -(2 * slideWidth) + 'px';
      index = 0;
    }


    video.src = `assets/video/video${index}.mp4`;
    video.poster = `assets/video/poster${index}.jpg`;

    allowShift = true;
  };



  prevBtn.addEventListener('click', () => {
    shiftSlide(index - 1);
  });
  nextBtn.addEventListener('click', () => {
    shiftSlide(index + 1);
  });


  wrapper.addEventListener('transitionend', checkIndex);

  for (let i = 0; i < dotsLength; i++) {
    dots[i].addEventListener('click', () => {
      allowShift = true;
      shiftSlide(i);
    });
  }
};


slideVideo(
  videoSlidesWrap,
  videoSlides,
  videoPrevBtn,
  videoNextBtn,
  videoDots,
  mainVideo,
);
