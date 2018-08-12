const fs = require('fs');
const path = require('path');

const languages = require('./languages').languages;
const order = require('./languages').order;
const phrases = require('../phrases.json');

const CURRENT_DIR = path.resolve(__dirname);
const README_PATH = CURRENT_DIR + '/README.md';

const createReadme = () => {
  const stream = fs.createWriteStream(README_PATH);

  stream.once('open', () => {
    phrases.phrases.map((phrase) => {
      stream.write(`\n### ${phrase.en}`);

      order.map((lang_code) => {
        const lang_name = languages[lang_code].name;
        const lang_phrase = phrase[lang_code];
        lang_phrase && stream.write(`\n- **${lang_name}:** ${lang_phrase}`)
      });

      stream.write('\n');
    })
  });
};

createReadme();
