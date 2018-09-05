const readline = require('readline');
const phrases = require('../phrases.json').phrases;
const romanize = require('../src/romanize').romanize;
const shuffle = require('../src/utils').shuffle;
const languages = require('../languages').languages;

const match = (phrase, answer) => {
  return (
    romanize(phrase.toLowerCase()) ===
    romanize(answer.toLowerCase())
  )
};

const showResults = () => {
  console.log('\n\n  Goodbye!');
};

const study = exports.study = (count = 1) => {
  const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  reader.on('SIGINT', () => {
    showResults();
    reader.close();
  });

  const shuffledPhrases = phrases.slice(0, count);

  const questions = shuffle(shuffledPhrases.reduce((acc, phrase) => {
    const otherQuestions = (
      Object.keys(phrase).filter((lang) => lang !== 'en').map((lang) => {
        return {
          lang: lang,
          language: languages[lang].name,
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

  const askQuestion = (completeCB, index) => {
    if (index >= shuffledPhrases.length) {
      return completeCB();
    }

    const phrase = questions[index];
    const question = `\n  ${phrase.english}\n  (${phrase.language}) > `;
    reader.question(question, (answer) => {
      askQuestion(completeCB, index+1)
    });
  };

  askQuestion(() => {
    console.log('done')
    reader.close();
  }, 0);
};

const main = () => {
  const count = Math.floor(process.argv[2]) || 1;
  study(count);
};

require.main === module && main();
