const randomInt = exports.randomInt = (min, max) => {
  return Math.min(Math.floor(Math.random() * max), max);
};

const shuffle = exports.shuffle = (array) => {
  const shuffledArray = [...array];
  shuffledArray.forEach((item, i) => {
    const randomIndex = randomInt(i, shuffledArray.length);
    const currentValue = shuffledArray[i];
    const selectedValue = shuffledArray[randomIndex];
    shuffledArray[i] = selectedValue;
    shuffledArray[randomIndex] = currentValue;
  });
  return shuffledArray;
};
