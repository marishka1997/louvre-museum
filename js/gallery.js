const gallery = document.querySelector('.gallery-inner-container');
const sources = [];

for (let i = 1; i <= NUMBER_OF_IMAGES; i++) {
  sources.push(i);
}

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); 
    [array[i], array[j]] = [array[j], array[i]];

  }
  return array;
};

const createAndAddNewImgElement = (number) => {
  const image = document.createElement('img');
  image.classList.add('gallery-img');
  image.src = `assets/img/gallery/gallery${number}.jpg`;
  image.alt = `gallery image`;
  gallery.append(image);
};

const fillGallery = (array) => {
  shuffleArray(array);
  array.map((item) => createAndAddNewImgElement(item));
};

fillGallery(sources);
