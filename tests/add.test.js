const reduceTranslations = require('../bin/add').reduceTranslations;

describe('reduceTranslations', () => {
  it('should reduce translation', () => {
    const phrase = "I'm going home";
    const translations = [{ language: 'zh', romanization: 'Wǒ yào huí jiāle', text: '我要回家了' }, { language: 'ja', romanization: 'Watashi wa ie ni iku yo', text: '私は家に行くよ' }, { language: 'es', romanization: '', text: 'Me voy a casa' }];
    const mockResult = { en: "I'm going home", zh: 'Wǒ yào huí jiāle', ja: 'Watashi wa ie ni iku yo', es: 'Me voy a casa' };
    expect(reduceTranslations(phrase, translations)).toEqual(mockResult);
  });
});
