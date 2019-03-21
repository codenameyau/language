import readline from 'readline';

import { phrases } from '../phrases.json';
import { matchRomanized, shuffle } from '../src/utils';
import { colors } from '../src/colors';
import config from '../config';

// TODO: implement levishtein distance


export const showResults = (questions) => {
  const correct = questions.reduce((acc, question) => {
    return acc += question.match;
  }, 0);

  const percent = correct / questions.length;

  console.log(`\n  ------------------`);
  console.log(`  Score: ${correct} / ${questions.length}`);
  console.log(`  ------------------`);
};

export const study = (count = 1, language) => {
  const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const questions = shuffle(phrases.reduce((acc, phrase) => {
    const otherQuestions = (
      Object.keys(phrase).filter((lang) => {
        return (lang !== 'en') && (!language || lang === language)
      }).map((lang) => {
        return {
          lang: lang,
          language: config.languages[lang].name,
          phrase: phrase[lang],
          question: phrase.en
        }
      })
    );

    return [
      ...acc,
      ...otherQuestions
    ]
  }, [])).slice(0, count);

  const askQuestion = (completeCB, index) => {
    if (index >= questions.length) {
      return completeCB();
    }

    const phrase = questions[index];
    const question = `\n  [${phrase.language}] ${phrase.question} \n  > `;

    reader.question(question, (answer) => {
      phrase.answer = answer;
      phrase.match = matchRomanized(phrase.phrase, answer);

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
  const language = process.argv[3];
  study(count, language);
};

require.main === module && main();
