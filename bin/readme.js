import fs from 'fs';
import path from 'path';

import config from '../config';
import phrases from '../phrases.json';

const README_PATH = path.resolve(__dirname) + '/../README.md';

const googleTranslateUrl = (phrase, langFrom, langTo = 'en') => {
  return (
    `https://translate.google.com/?tl=${langFrom}#${langTo}/${langFrom}/${encodeURIComponent(phrase)}`
  )
}

// TODO: Open in new tab when github flavored markdown supports it.
const markdownUrl = (text, url) => {
  return `[${text}](${url})`;
};

export default main = () => {
  const stream = fs.createWriteStream(README_PATH);

  stream.once('open', () => {
    phrases.phrases.map((phrase) => {
      stream.write(`\n### ${phrase.en}`);

      config.order.map((lang_code) => {
        const language = config.languages[lang_code];
        const languagePhrase = phrase[lang_code];
        const url = googleTranslateUrl(phrase.en, language.translate_code);
        const markdown = markdownUrl(languagePhrase, url)
        languagePhrase && stream.write(`\n- ${language.name}: ${markdown}`)
      });

      stream.write('\n');
    })
  });
};

require.main === module && main();
