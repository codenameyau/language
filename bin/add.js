const fs = require('fs');
const path = require('path');
const translateToLanguages = require('./translate').translateToLanguages;
const phrases = require('../phrases.json');
const PHRASES_PATH = path.resolve(__dirname) + '/../phrases.json';

const reduceTranslations = exports.reduceTranslations = (phrase, translations) => {
  const newPhrase = translations.reduce((acc, translation) => {
    return {
      ...acc,
      [translation.language]: translation.romanization || translation.text
    }
  }, {
    'en': phrase
  });

  return newPhrase;
};

const main = () => {
  const phrase = process.argv[2];

  phrase && translateToLanguages(phrase).then((translations) => {
    const newPhrase = reduceTranslations(phrase, translations);

    const newPhrases = {
      ...phrases,
      phrases: [
        ...phrases.phrases,
        newPhrase
      ]
    };

    console.log(newPhrases);
  });
};

require.main === module && main();
