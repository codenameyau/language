import { phrases } from './fixtures/phrases';
import {
  matchesLevenshtein,
  filterLanguage,
  createQuestions,
} from '../study';

describe('study', () => {
  describe('matchesLevenshtein()', () => {
    it('should return true for empty string', () => {
      expect(matchesLevenshtein('', '')).toEqual(true);
    });

    it('should return true for correct match', () => {
      const phrase = 'Duōshǎo qián?';
      const answer = 'Duōshǎo qián?';
      expect(matchesLevenshtein(phrase, answer)).toEqual(true);
    });

    it('should return true for correct match ignoring diacratics', () => {
      const phrase = 'Duōshǎo qián?';
      const answer = 'Duoshao qian?';
      expect(matchesLevenshtein(phrase, answer)).toEqual(true);
    });

    it('should return true for correct match ignoring capitalization', () => {
      const phrase = 'Duōshǎo qián?';
      const answer = 'duōshǎo qián?';
      expect(matchesLevenshtein(phrase, answer)).toEqual(true);
    });

    it('should return true for missing 1 character', () => {
      const phrase = 'Duōshǎo qián?';
      const answer = 'Duōshǎo qián';
      expect(matchesLevenshtein(phrase, answer, 2)).toEqual(true);
    });

    it('should return true for missing 2 characters', () => {
      const phrase = 'Duōshǎo qián?';
      const answer = 'Duōshǎo qia';
      expect(matchesLevenshtein(phrase, answer, 2)).toEqual(true);
    });

    it('should return false for missing 3 characters', () => {
      const phrase = 'Duōshǎo qián?';
      const answer = 'Duōshǎo qi';
      expect(matchesLevenshtein(phrase, answer, 2)).toEqual(false);
    });
  });

  // describe('filterLanguage()', () => {

  // });

  // describe('createQuestions()', () => {

  // });
});
