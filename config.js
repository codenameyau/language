export const languages = {
  en: {
    name: 'English',
    api_code: 'en',
    translate_code: 'en',
    romanize: false,
  },
  zh: {
    name: 'Chinese',
    api_code: 'zh-cn',
    translate_code: 'zh-CN',
    romanize: true,
  },
  ja: {
    name: 'Japanese',
    api_code: 'ja',
    translate_code: 'ja',
    romanize: true,
  },
  es: {
    name: 'Spanish',
    api_code: 'es',
    translate_code: 'es',
    romanize: false,
  },
};

export const order = [
  'zh',
  'ja',
  'es',
]

export default {
  languages,
  order
};
