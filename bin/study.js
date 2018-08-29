const readline = require('readline');
const phrases = require('../phrases.json').phrases;
const randomInt = require('../src/utils').randomInt;
const romanize = require('../src/romanize').romanize;
const shuffle = require('../src/utils').shuffle;

const match = (phrase, answer) => {
  return (
    romanize(phrase.toLowerCase()) ===
    romanize(answer.toLowerCase())
  )
};

const study = exports.study = (count = 1) => {
  const shuffledPhrases = shuffle(phrases);
  const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const phrasePromise = async (phrase, language) => {
    return new Promise((resolve, reject) => {
      const question = `  ${phrase.en}\n  (${language}) > `;
      reader.clearLine();
      reader.question(question, (answer) => {
        resolve(answer);
      });
    });
  };

  const promises = shuffledPhrases.slice(0, count).map((phrase) => {
    return phrasePromise(phrase, 'zh');
  });

  console.log(promises);

  // const phrase = shuffledPhrases[0];
  // const promise = phrasePromise(phrase, 'zh');

  // for (let i=0; i<count; i++) {
  //   const phrase = shuffledPhrases[i];
  //   const languages = Object.keys(phrase).filter((lang) => lang !== 'en');
  //   console.log(`  ${phrase.en}\n`);
  //   languages.forEach((language) => {
  //     const question = `  (${language}) > `;
  //     reader.question(question, (answer) => {
  //       console.log(answer);
  //     });
  //   });
  // }

};

const main = () => {
  const count = Math.floor(process.argv[2]) || 1;
  study(count);
};

require.main === module && main();
