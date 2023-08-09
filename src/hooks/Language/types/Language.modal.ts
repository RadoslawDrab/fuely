import translations from '@data/translations.json'

// Available texts
export type Texts = keyof typeof translations

// Languages other than English
type OtherLanguages = keyof (typeof translations)['Button']
// All languages
export type Languages = 'en' | OtherLanguages

// Translation object type
export type Translation = { [key in OtherLanguages | string]: string }
// All available translations type
export type Translations = {
	[key in Texts]: Translation
}

export type LanguageObject = {
	getText: (text: Texts) => string
	setLanguage: (lang: Languages) => void
	language: Languages | string
	languages: Languages[]
}
