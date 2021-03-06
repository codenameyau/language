import readline from 'readline';

import { phrases } from '../phrases.json';
import { shuffle } from '../src/utils';
import { colors } from '../src/colors';
import { matchesLevenshtein, prepareQuestions } from '../src/common';
import config from '../config';

export const study = ({ language, count }) => {
  const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const questions = shuffle(prepareQuestions(phrases, language));

  const askQuestion = (completeCB, index) => {
    if ((index >= questions.length) || (index >= count)) {
      return completeCB();
    }

    const question = questions[index];

    const questionFormatted =
      `\n  [${question.language}] ${question.question} \n  > `;

    reader.question(questionFormatted, (answer) => {
      question.answer = answer;
      question.match = matchesLevenshtein(
        question.phrase, answer, config.MARGIN_OF_ERROR
      );

      if (question.match) {
        console.log(`${colors.fg.green}    ️${question.phrase} ${colors.reset}`);
      } else {
        console.log(`${colors.fg.red}    ${question.phrase} ${colors.reset}\n\n  ${question.link}\n`);
      }

      askQuestion(completeCB, index+1)
    });
  };

  askQuestion(() => {
    reader.close();
  }, 0);
};

const main = () => {
  // TODO: Replace arg index with arg parse.
  const language = process.argv[2];
  const count = process.argv[3];
  study({ language, count });
};

require.main === module && main();
