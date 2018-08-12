const fs = require('fs');
const path = require('path');

const phrases = require('./phrases');
const CURRENT_DIR = path.resolve(__dirname);
const README_PATH = CURRENT_DIR + '/README.md';

const LANG_MAP = {
  en: {
    name: 'English',
  },
  zh: {
    name: 'Chinese',
  },
  ja: {
    name: 'Japanese',
  },
  es: {
    name: 'Spanish',
  },
};

const LANG_ORDER = [
  'zh',
  'ja',
  'es',
];

const createReadme = () => {
  const stream = fs.createWriteStream(README_PATH);

  stream.once('open', () => {
    phrases.map((phrase) => {
      stream.write(`\n### ${phrase.en}`);

      LANG_ORDER.map((lang_code) => {
        const lang_name = LANG_MAP[lang_code].name;
        const lang_phrase = phrase[lang_code];
        lang_phrase && stream.write(`\n- **${lang_name}:** ${lang_phrase}`)
      });

      stream.write('\n');
    })
  });
};

createReadme();
