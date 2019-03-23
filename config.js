export const languages = {
  en: {
    name: 'English',
    api_code: 'en',
    translate_code: 'en',
    romanize: false,
    marginOfError: 5,
  },
  zh: {
    name: 'Chinese',
    api_code: 'zh-cn',
    translate_code: 'zh-CN',
    romanize: true,
    marginOfError: 5,
  },
  ja: {
    name: 'Japanese',
    api_code: 'ja',
    translate_code: 'ja',
    romanize: true,
    marginOfError: 5,
  },
  es: {
    name: 'Spanish',
    api_code: 'es',
    translate_code: 'es',
    romanize: false,
    marginOfError: 5,
  },
};

export const order = [
  'zh',
  'ja',
  'es',
]

export default {
  languages,
  order,
};
