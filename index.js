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
};

const LANG_ORDER = [
  'zh',
  'ja',
];

const createReadme = () => {
  const stream = fs.createWriteStream(README_PATH);

  stream.once('open', () => {
    phrases.map((phrase) => {
      stream.write(`\n### ${phrase.en}`);

      LANG_ORDER.map((lang_code) => {
        const lang_name = LANG_MAP[lang_code].name;
        stream.write(`\n${lang_name}:`)
        stream.write(`\n- ${phrase[lang_code]}`)
      });

      stream.write('\n');
    })
  });
};

createReadme();
