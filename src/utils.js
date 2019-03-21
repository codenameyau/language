export const randomInt = (min, max) => {
  return Math.min(Math.floor(Math.random() * max), max);
};

export const shuffle = (array) => {
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

export const levishtein = (stringA, stringB) => {

};
