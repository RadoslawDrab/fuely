import { useEffect, useState } from 'react'
import translations from '@data/translations.json'

import { LanguageObject, Languages, Texts, Translations } from '@type/hooks/use-language.modal'

const translationsObject: Translations = translations

const allLanguages: any = ['en', ...Object.keys(translations.Button)]
function useLanguage(): LanguageObject {
	const [currentLang, setCurrentLanguage] = useState<Languages | string>('en')

	useEffect(() => {
		// Changes language based on language set in browser
		setCurrentLanguage(() => navigator.language.split('-')[0])
	}, [])
	useEffect(() => {
		// Changes `html` element language based on current language
		const htmlElement = document.querySelector('html')
		if (htmlElement) htmlElement.lang = currentLang
	}, [currentLang])

	// Sets language
	function setLanguage(lang: Languages) {
		setCurrentLanguage(() => lang)
	}
	function getText(text: Texts): string {
		// Returns current text with English language is selected
		if (currentLang === 'en') return text

		// Translation found for `text`
		const foundTranslation = translationsObject[text]
		// Translation for current language
		return foundTranslation[currentLang] || text
	}
	const languages: Languages[] = allLanguages
	return { getText, setLanguage, language: currentLang, languages }
}

export default useLanguage

export const exampleLanguageObject: LanguageObject = {
	setLanguage: () => {},
	getText: () => '',
	language: allLanguages[0],
	languages: [...allLanguages]
}
