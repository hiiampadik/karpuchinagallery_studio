const languages = [
  {id: 'cs', title: 'Czech', isDefault: true},
  {id: 'en', title: 'English'},
]

const i18n = {
  languages,
  base: languages.find((item) => item.isDefault).id,
}

const googleTranslateLanguages = languages.map(({id, title}) => ({id, title}))

export {i18n, googleTranslateLanguages}