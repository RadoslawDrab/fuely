import React from 'react'

import useAppContext from '@/hooks/use-app-context'
import { getRandomKey } from '@/utils'

import Button from '@/components/UI/Button'

import styles from '@styles/Layout/Footer.module.scss'

function Footer() {
	const { setLanguage, languages, getText, language: currentLanguage } = useAppContext().Language
	const { toggleTheme } = useAppContext().Theme

	function onLanguageChange(e: React.MouseEvent<HTMLButtonElement>) {
		const buttonLang: any = e.currentTarget.dataset.language
		setLanguage(buttonLang || 'en')
	}
	const languageButtons = languages.map((lang) => {
		const language = lang.toString()
		const key = `${language}-${getRandomKey()}`
		return (
			<li key={key}>
				<Button onClick={onLanguageChange} selected={currentLanguage === language} data={{ language: language }}>
					{language}
				</Button>
			</li>
		)
	})
	return (
		<footer className={styles.footer}>
			<ul>{languageButtons}</ul>
			<Button onClick={toggleTheme}>{getText('Theme')}</Button>
		</footer>
	)
}

export default Footer
