const phrases = require('../phrases.json');
const randomInt = require('../src/utils').randomInt;
const romanize = require('../src/romanize').romanize;
const languages = require('../languages');

const match = (phrase, answer) => {
  return (
    romanize(phrase.toLowerCase()) ===
    romanize(answer.toLowerCase())
  )
};

const study = exports.study = () => {
  const length = phrases.phrases.length;
  const selection = randomInt(0, length);
  const phrase = phrases.phrases[selection];
  console.log(phrase.en);
};

const main = () => {
  study();
};

require.main === module && main();
