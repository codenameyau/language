import { phrases } from './fixtures/phrases';
import {
  matchesLevenshtein,
  filterByLanguage,
  prepareQuestions,
} from '../common';

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

  describe('filterLanguage()', () => {
    it('should return empty array for empty language', () => {
      expect(filterByLanguage({})).toEqual([]);
    });

    it('should return array of languages if no filteres applied', () => {
      expect(filterByLanguage(phrases.phrases[0])).toEqual(['zh']);
      expect(filterByLanguage(phrases.phrases[1])).toEqual(['zh', 'ja']);
      expect(filterByLanguage(phrases.phrases[2])).toEqual(['zh', 'ja', 'es']);
    });

    it('should return array with a filtered language', () => {
      expect(filterByLanguage(phrases.phrases[0], 'zh')).toEqual(['zh']);
      expect(filterByLanguage(phrases.phrases[1], 'zh')).toEqual(['zh']);
      expect(filterByLanguage(phrases.phrases[2], 'zh')).toEqual(['zh']);
    });

    it('should return array with a different base language', () => {
      expect(filterByLanguage(phrases.phrases[0], null, 'zh')).toEqual(['en']);
      expect(filterByLanguage(phrases.phrases[1], null, 'zh')).toEqual(['en', 'ja']);
      expect(filterByLanguage(phrases.phrases[2], null, 'zh')).toEqual(['en', 'ja', 'es']);
    });

    it('should return array with a filter and different base language', () => {
      expect(filterByLanguage(phrases.phrases[0], 'en', 'zh')).toEqual(['en']);
      expect(filterByLanguage(phrases.phrases[1], 'en', 'zh')).toEqual(['en']);
      expect(filterByLanguage(phrases.phrases[2], 'en', 'zh')).toEqual(['en']);
    });
  });

  describe('prepareQuestions()', () => {
    it('should return empty array', () => {
      expect(prepareQuestions([])).toEqual([]);
    });

    it('should return an array of questions', () => {
      expect(prepareQuestions(phrases.phrases).length).toEqual(6);
    });

    it('should return an array of questions for language', () => {
      expect(prepareQuestions(phrases.phrases, 'zh').length).toEqual(3);
      expect(prepareQuestions(phrases.phrases, 'ja').length).toEqual(2);
      expect(prepareQuestions(phrases.phrases, 'es').length).toEqual(1);
    });

    it('should return an empty array for unknown language', () => {
      expect(prepareQuestions(phrases.phrases, '??').length).toEqual(0);
    });
  });
});
