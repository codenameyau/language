const readline = require('readline');
const phrases = require('../phrases.json').phrases;
const romanize = require('../src/romanize').romanize;
const shuffle = require('../src/utils').shuffle;
const languages = require('../languages').languages;
const colors = require('../src/colors');

const match = (phrase, answer) => {
  const cleanPhrase = romanize(phrase.toLowerCase());
  const cleanAnswer = romanize(answer.toLowerCase());
  return cleanPhrase === cleanAnswer;
};

const showResults = (questions) => {
  console.log('\n\n  Goodbye!');
};

const study = exports.study = (count = 1) => {
  const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const shuffledPhrases = phrases.slice(0, count);

  const questions = shuffle(shuffledPhrases.reduce((acc, phrase) => {
    const otherQuestions = (
      Object.keys(phrase).filter((lang) => lang !== 'en').map((lang) => {
        return {
          lang: lang,
          language: languages[lang].name,
          phrase: phrase[lang],
          question: phrase.en
        }
      })
    );

    return [
      ...acc,
      ...otherQuestions
    ]
  }, []));

  const askQuestion = (completeCB, index) => {
    if (index >= questions.length) {
      return completeCB();
    }

    const phrase = questions[index];
    const question = `\n  [${phrase.language}] ${phrase.question} \n  > `;

    reader.question(question, (answer) => {
      phrase.answer = answer;
      phrase.match = match(phrase.question, answer);

      if (phrase.match) {
        console.log(colors.fg.green, ` ✔️ ${phrase.phrase}`, colors.reset);
      } else {
        console.log(colors.fg.red, ` ❌ ${phrase.phrase}`, colors.reset);
      }

      askQuestion(completeCB, index+1)
    });
  };

  reader.on('SIGINT', () => {
    showResults(questions);
    reader.close();
  });

  askQuestion(() => {
    showResults(questions);
    reader.close();
  }, 0);
};

const main = () => {
  const count = Math.floor(process.argv[2]) || 1;
  study(count);
};

require.main === module && main();
