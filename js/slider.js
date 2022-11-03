const slide = (wrapper, slides, prevBtn, nextBtn, dots, currentSlideNumber) => {
  let posX1 = 0;
  let posX2 = 0;
  let posInitial = 0;
  let posFinal = 0;
  let threshold = 50; 
  const slidesLength = slides.length;
  const dotsLength = dots.length;
  const slideWidth = slides[0].offsetWidth; 
  let index = 0;
  let allowShift = true;

  
  const firstSlide = slides[0];
  const lastSlide = slides[slidesLength - 1];
  const cloneFirst = firstSlide.cloneNode(true);
  const cloneLast = lastSlide.cloneNode(true);
  wrapper.appendChild(cloneFirst);
  wrapper.insertBefore(cloneLast, firstSlide);

  const dragStart = (e) => {
    e = e || window.event;
    e.preventDefault();
    posInitial = wrapper.offsetLeft; 

    posX1 = e.clientX;

    document.addEventListener('mouseup', dragEnd);
    document.addEventListener('mousemove', dragAction);
  };

  const dragAction = (e) => {
    e = e || window.event;

    posX2 = posX1 - e.clientX;
    posX1 = e.clientX;
    wrapper.style.left = wrapper.offsetLeft - posX2 + 'px';
  };

  const dragEnd = (e) => {
    posFinal = wrapper.offsetLeft;

    if (posFinal - posInitial < -threshold) {
      shiftSlide(index + 1, 'drag'); 
    } else if (posFinal - posInitial > threshold) {
      shiftSlide(index - 1, 'drag'); 
    } else {
      wrapper.style.left = posInitial + 'px'; 
    }

    
    document.removeEventListener('mouseup', dragEnd);
    document.removeEventListener('mousemove', dragAction);
  };

  const shiftSlide = (shiftTo, action) => {
    wrapper.classList.add('shifting'); 

    if (index >= 0 && index < dotsLength) {
      dots[index].classList.remove('active');
    }

    if (allowShift) {
      if (!action) {
        posInitial = wrapper.offsetLeft;
      }

      const difference = index - shiftTo;
      index = shiftTo;
      wrapper.style.left = posInitial + difference * slideWidth + 'px';
    }

    if (index >= 0 && index < dotsLength) {
      dots[index].classList.add('active');
      if (currentSlideNumber) {
        currentSlideNumber.textContent = `0${index + 1}`;
      }
    }
    if (index < 0) {
      dots[dotsLength - 1].classList.add('active');
      if (currentSlideNumber) {
        currentSlideNumber.textContent = `0${dotsLength}`;
      }
    }
    if (index >= dotsLength) {
      dots[0].classList.add('active');
      if (currentSlideNumber) {
        currentSlideNumber.textContent = '01';
      }
    }

    allowShift = false;
  };

  
  const checkIndex = () => {
    wrapper.classList.remove('shifting');

    if (index === -1) {
      wrapper.style.left = -(slidesLength * slideWidth) + 'px';
      index = slidesLength - 1;
    }

    if (index === slidesLength) {
      wrapper.style.left = -(1 * slideWidth) + 'px';
      index = 0;
    }

    allowShift = true;
  };

  wrapper.addEventListener('mousedown', dragStart);

  // Click events
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
