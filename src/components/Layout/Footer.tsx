import React from 'react'
import Link from 'next/link'

import useAppContext from '@/hooks/use-app-context'
import { className, getRandomKey } from '@/utils'

import Button from '@/components/UI/Button'
import Column from './Footer/Column'
import NavigationButtons from './NavigationButtons'

import styles from '@styles/Layout/Footer.module.scss'
import buttonStyles from '@styles/UI/Button.module.scss'
import Icon from '../UI/Icon'

const contactInfo = [
	{ name: 'GitHub', link: 'https://github.com/RadoslawDrab' },
	{ name: 'LinkedIn', link: 'https://www.linkedin.com/in/radoslaw-drab/' },
	{ name: 'Mail', link: 'mailto:radoslaw.drab03@gmail.com' }
]
function Footer() {
	const { setLanguage, languages, getText, language: currentLanguage } = useAppContext().Language
	const { toggleTheme } = useAppContext().Theme

	function onLanguageChange(e: React.MouseEvent<HTMLButtonElement>) {
		const buttonLang: any = e.currentTarget.dataset.language
		setLanguage(buttonLang || 'en')
	}

	const contactInfoLinks = contactInfo.map((info) => {
		const name = info.name.toLowerCase()
		const key = `${name}-${getRandomKey()}`
		const linkStyle = className(buttonStyles.button, buttonStyles['button_link'], `${name}-link-button`)
		return (
			<li key={key}>
				<Link className={linkStyle} href={info.link} target="_blank">
					{info.name}
				</Link>
			</li>
		)
	})
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
			<Column title="Pages" name="pages">
				<NavigationButtons buttonsVariant="link" />
			</Column>
			<Column title="Contact" name="contact">
				{contactInfoLinks}
			</Column>
			<Column title="" name="options">
				<ul>{languageButtons}</ul>
				<Button onClick={toggleTheme}>{getText('Theme')}</Button>
			</Column>
			<div className={styles['footer-copywrite']}>
				<div className={styles['footer-logo']}>
					<Icon type="logo" alt="logo icon" />
					<span>Fuely</span>
				</div>
				<span>&copy; Radosław Drab</span>
			</div>
		</footer>
	)
}

export default Footer
