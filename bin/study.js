const readline = require('readline');
const phrases = require('../phrases.json').phrases;
const romanize = require('../src/romanize').romanize;
const shuffle = require('../src/utils').shuffle;

const match = (phrase, answer) => {
  return (
    romanize(phrase.toLowerCase()) ===
    romanize(answer.toLowerCase())
  )
};

const study = exports.study = (count = 1) => {
  const shuffledPhrases = phrases.slice(0, count);

  const questions = shuffle(shuffledPhrases.reduce((acc, phrase) => {
    const otherQuestions = (
      Object.keys(phrase).filter((lang) => lang !== 'en').map((lang) => {
        return {
          language: lang,
          phrase: phrase[lang],
          english: phrase.en
        }
      })
    );

    return [
      ...acc,
      ...otherQuestions
    ]
  }, []));

  console.log(questions);
  return;

  const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const askQuestion = (phrase, language, index) => {
    if (index >= shuffledPhrases.length) {
      return;
    }

    const question = `  ${phrase.en}\n  (${language}) > `;
    reader.question(question, (answer) => {
      askQuestion()
      console.log('answer', answer);
    });
  };

  // console.log(promises[0]());

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
