const fs = require('fs');
const path = require('path');
const README_PATH = path.resolve(__dirname) + '/../README.md';

const languages = require('./languages').languages;
const order = require('./languages').order;
const phrases = require('../phrases.json');

const googleTranslateUrl = (phrase, langFrom, langTo = 'en') => {
  return (
    `https://translate.google.com/?tl=${langFrom}#${langTo}/${langFrom}/${encodeURIComponent(phrase)}`
  )
}

const markdownUrl = (text, url) => {
  return `[${text}{:target="_blank"}](${url})`;
};

const main = () => {
  const stream = fs.createWriteStream(README_PATH);

  stream.once('open', () => {
    phrases.phrases.map((phrase) => {
      stream.write(`\n### ${phrase.en}`);

      order.map((lang_code) => {
        const language = languages[lang_code];
        const languagePhrase = phrase[lang_code];
        const url = googleTranslateUrl(phrase.en, language.translate_code);
        const markdown = markdownUrl(language.name, url)
        languagePhrase && stream.write(`\n- ${markdown}: ${languagePhrase}`)
      });

      stream.write('\n');
    })
  });
};

require.main === module && main();
