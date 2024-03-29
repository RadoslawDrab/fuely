import React from 'react'

import useAppContext from '@/hooks/Other/use-app-context'
import { getRandomKey } from '@/utils'

import Icon from '@/components/UI/Icon'
import Button from '@/components/UI/Button'

import styles from '@styles/Layout/Footer/Options.module.scss'

export default function Options() {
	const { getText, languages, language: currentLanguage, setLanguage } = useAppContext().Language
	const { isDarkTheme, toggleTheme } = useAppContext().Theme

	function onLanguageChange(e: React.MouseEvent<HTMLButtonElement>) {
		const buttonLang: any = e.currentTarget.dataset.language
		setLanguage(buttonLang || 'en')
	}

	const languageButtons = languages.map((lang) => {
		const key = `${lang.toString()}-${getRandomKey()}`
		return (
			<li key={key}>
				<Button
					onClick={onLanguageChange}
					selected={currentLanguage === lang}
					data={{ language: lang.toString() }}
					variant="dark">
					{lang.toString().toUpperCase()}
				</Button>
			</li>
		)
	})

	return (
		<div className={styles.options}>
			<ul>
				<li>
					<Icon className={styles['translation-icon']} type="translate" alt="translate icon" />
				</li>
				{languageButtons}
			</ul>
			<Button className={styles['theme-button']} onClick={toggleTheme} variant="dark">
				{isDarkTheme && (
					<>
						<Icon type="sun" alt="sun icon" />
						<span>{getText('Light')}</span>
					</>
				)}
				{!isDarkTheme && (
					<>
						<Icon type="moon" alt="moon icon" />
						<span>{getText('Dark')}</span>
					</>
				)}
			</Button>
		</div>
	)
}
