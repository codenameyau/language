import { levenshtein } from '../levenshtein';

describe('levenshtein', () => {
  it('should return 0 for empty string comparisons', () => {
    expect(levenshtein('', '')).toEqual(0);
  });

  it('should return distance for single-length string comparisons', () => {
    expect(levenshtein('A', 'A')).toEqual(0);
    expect(levenshtein('A', 'a')).toEqual(1);
    expect(levenshtein('a', 'A')).toEqual(1);
  });

  it('should return distance for multi-length string comparisons', () => {
    expect(levenshtein('HONDA', 'HYUNDAI')).toEqual(3);
    expect(levenshtein('HONDA', 'Hyundai')).toEqual(6);
    expect(levenshtein('Honda', 'HYUNDAI')).toEqual(6);
    expect(levenshtein('Honda', 'Hyundai')).toEqual(3);
  });
});
