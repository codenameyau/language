const romanize = require('../src/romanize').romanize;

describe('romanize', () => {
  it('should romanize empty string', () => {
    expect(romanize('')).toEqual('');
  });

  it('should romanize chinese characters', () => {
    const phrase = 'Nǐ de shēngrì shì shénme shíhòu';
    const expectation = 'Ni de shengri shi shenme shihou';
    expect(romanize(phrase)).toEqual(expectation);
  });

  it('should romanize spanish characters', () => {
    const phrase = 'Volveré a casa la próxima semana';
    const expectation = 'Volvere a casa la proxima semana';
    expect(romanize(phrase)).toEqual(expectation);
  });
});
