import readline from 'readline';

import { phrases } from '../phrases.json';
import { romanize } from '../src/romanize';
import { levenshtein } from '../src/levenshtein';
import { shuffle, getGoogleTranslateLink } from '../src/utils';
import { colors } from '../src/colors';
import config from '../config';

export function matchesLevenshtein(phrase, answer, marginOfError = 0) {
  const cleanPhrase = romanize(phrase.toLowerCase());
  const cleanAnswer = romanize(answer.toLowerCase());
  const distance = levenshtein(cleanPhrase, cleanAnswer);
  return distance <= marginOfError;
}

export function filterLanguage(questions, lang) {
  return
}

export function createQuestions(questions, lang) {
  return questions.map((question) => {
    return {

    }
  });
}

export const study = (language) => {
  const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const questions = shuffle(phrases.reduce((acc, phrase) => {
    const otherQuestions = (
      Object.keys(phrase).filter((lang) => {
        return (lang !== 'en') && (!language || lang === language)
      }).map((lang) => {
        const languageConfig = config.languages[lang];

        return {
          lang: lang,
          language: languageConfig.name,
          link: getGoogleTranslateLink('en', languageConfig.translate_code, phrase.en),
          translate_code: languageConfig.translate_code,
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
    if (index >= phrases.length) {
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
  const language = process.argv[2];
  study(language);
};

require.main === module && main();
