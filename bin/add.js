import fs from 'fs';
import path from 'path';

import { translateToLanguages } from './translate';
import phrases from '../phrases.json';

const PHRASES_PATH = path.resolve(__dirname) + '/../phrases.json';

export const reduceTranslations = (phrase, translations) => {
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

export const addPhrase = (phrase) => {
  return translateToLanguages(phrase).then((translations) => {
    console.log(JSON.stringify(translations, null, 2));

    const newPhrase = reduceTranslations(phrase, translations);

    const newPhrases = {
      ...phrases,
      phrases: [
        newPhrase,
        ...phrases.phrases,
      ]
    };

    const stream = fs.createWriteStream(PHRASES_PATH);
    stream.write(JSON.stringify(newPhrases, null, 2));
    stream.write('\n');
  });
};

const main = () => {
  const phrase = process.argv[2];
  phrase && addPhrase(phrase);
};

require.main === module && main();
