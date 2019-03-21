import translate from '@vitalets/google-translate-api';
import config from '../config';

export const parseRomization = (res) => {
  return (res.raw && JSON.parse(res.raw)[0][1][2]) || '';
};

export const translatePhrase = (phrase, languageCode) => {
  const language = config.languages[languageCode];
  const api_code = language.api_code;
  const useRaw = language.romanize;

  return translate(phrase, {
    to: api_code,
    raw: useRaw
  });
};

export const translateToLanguages = (phrase) => {
  const promises = config.order.map((languageCode) => {
    return translatePhrase(phrase, languageCode).then((res) => {
      return {
        language: languageCode,
        romanization: parseRomization(res),
        text: res.text,
      };
    });
  });

  return Promise.all(promises).catch((err) => {
    console.error(err);
  });
};

const main = () => {
  const phrase = process.argv[2];
  phrase && translateToLanguages(phrase).then((translations) => {
    console.log(JSON.stringify(translations, null, 2));
  });
};

require.main === module && main();
