import { useEffect, useState } from 'react'

import translations from '@data/translations.json'
import { getLocalStorage, isClient, setLocalStorage } from '@/utils'

import { LanguageObject, Languages, Texts, Translations } from './types/Language.modal'

const translationsObject: Translations = translations

const allLanguages: any = ['en', ...Object.keys(translations.Button)]

function useLanguage(): LanguageObject {
	const [currentLang, setCurrentLanguage] = useState<Languages>('en')

	useEffect(() => {
		// Changes language based on language set in browser
		const language: any = getLocalStorage()?.language || navigator.language.split('-')[0]
		setCurrentLanguage(() => language)
	}, [])
	useEffect(() => {
		// Changes `html` element language based on current language
		const htmlElement = document.querySelector('html')
		if (htmlElement) htmlElement.lang = currentLang as string
	}, [currentLang])

	// Sets language
	function setLanguage(lang: Languages) {
		setLocalStorage({ language: lang })
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

export const currentLang: Languages = (isClient() ? document.querySelector('html')?.lang || 'en' : 'en') as Languages
export function getText(text: Texts, language: Languages = currentLang): string {
	// Returns current text with English language is selected
	if (language === 'en') return text

	// Translation found for `text`
	const foundTranslation = translationsObject[text]
	// Translation for current language
	return foundTranslation[language] || text
}
