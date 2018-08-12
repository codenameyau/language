const fs = require('fs');
const path = require('path');

const phrases = require('../phrases.json');
const PHRASES_PATH = path.resolve(__dirname) + '/../phrases.json';

const main = () => {
  const emptyPhrases = {
    ...phrases,
    phrases: []
  };

  const stream = fs.createWriteStream(PHRASES_PATH);
  stream.write(JSON.stringify(emptyPhrases, null, 2));
};

require.main === module && main();
