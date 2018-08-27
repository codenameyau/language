const phrases = require('../phrases.json');
const randomInt = require('../src/utils').randomInt;

const study = exports.study = () => {
  const length = phrases.phrases.length;
  const selection = randomInt(0, length);
  const phrase = phrases.phrases[selection];
  console.log(phrase);
};


const main = () => {
  study();
};

require.main === module && main();
