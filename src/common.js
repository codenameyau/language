import { romanize } from '../src/romanize';
import { levenshtein } from '../src/levenshtein';
import { getGoogleTranslateLink } from '../src/utils';
import config from '../config';

export function matchesLevenshtein(phrase, answer, marginOfError = 0) {
  const cleanPhrase = romanize(phrase.toLowerCase());
  const cleanAnswer = romanize(answer.toLowerCase());
  const distance = levenshtein(cleanPhrase, cleanAnswer);
  return distance <= marginOfError;
}

export function filterByLanguage(phrase, language, baseLanguage = 'en') {
  const filteredPhrase = Object.keys(phrase).filter((lang) => {
    return (lang !== baseLanguage) && (!language || lang === language);
  });

  return filteredPhrase;
}

export function prepareQuestions(phrases, language) {
  const questions = phrases.reduce((acc, phrase) => {
    const otherQuestions = filterByLanguage(phrase, language).map((lang) => {
      const languageConfig = config.languages[lang];

      return {
        lang: lang,
        language: languageConfig.name,
        link: getGoogleTranslateLink('en', languageConfig.translate_code, phrase.en),
        translate_code: languageConfig.translate_code,
        phrase: phrase[lang],
        question: phrase.en
      }
    });

    return [
      ...acc,
      ...otherQuestions
    ]
  }, []);

  return questions;
}
