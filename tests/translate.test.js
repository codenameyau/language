const parseRomization = require('../bin/translate').parseRomization;

describe('parseRomization', () => {
  it('should parse romanization: zh', () => {
    const mockRaw = { text: '我要回家了', from: { language: { didYouMean: false, iso: 'en' }, text: { autoCorrected: false, value: '', didYouMean: false } }, raw: '[[["我要回家了","I\'m going home",null,null,1],[null,null,"Wǒ yào huí jiāle"]],null,"en",null,null,[["I\'m going home",null,[["我要回家了",1000,true,false],["我要回家",0,true,false]],[[0,14]],"I\'m going home",0,0]],1,null,[["en"],null,[1],["en"]],null,null,null,null,null,[["home","I","going","m"]]]' }
    expect(parseRomization(mockRaw, true)).toEqual("Wǒ yào huí jiāle");
  });

  it('should parse romanization: ja', () => {
    const mockRaw = { text: '私は家に行くよ', from: { language: { didYouMean: false, iso: 'en' }, text: { autoCorrected: false, value: '', didYouMean: false } }, raw: '[[["私は家に行くよ","I\'m going home",null,null,1],[null,null,"Watashi wa ie ni iku yo"]],null,"en",null,null,[["I\'m going home",null,[["私は家に行くよ",1000,true,false],["私は家に帰る",0,true,false],["私は家に行きますよ",0,true,false]],[[0,14]],"I\'m going home",0,0]],1,null,[["en"],null,[1],["en"]],null,null,null,null,null,[["home","I","going","m"]]]' }
    expect(parseRomization(mockRaw, true)).toEqual("Watashi wa ie ni iku yo");
  });

  it('should parse romanization: es', () => {
    const mockRaw = { text: 'Me voy a casa', from: { language: { didYouMean: false, iso: 'en' }, text: { autoCorrected: false, value: '', didYouMean: false } }, raw: '' }
    expect(parseRomization(mockRaw, false)).toEqual("");
  });
});
