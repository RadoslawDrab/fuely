import React from 'react'
import Link from 'next/link'

import useAppContext from '@/hooks/Other/use-app-context'
import { className, getRandomKey } from '@/utils'

import Column from './Column'
import NavigationButtons from '../Header/NavigationButtons'
import Copywrite from './Copywrite'
import Options from './Options'

import styles from '@styles/Layout/Footer/Footer.module.scss'
import buttonStyles from '@styles/UI/Button.module.scss'

const contactInfo = [
	{ name: 'GitHub', link: 'https://github.com/RadoslawDrab' },
	{ name: 'LinkedIn', link: 'https://www.linkedin.com/in/radoslaw-drab/' },
	{ name: 'Mail', link: 'mailto:radoslaw.drab03@gmail.com' }
]
function Footer() {
	const { getText } = useAppContext().Language

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

	return (
		<footer className={styles.footer}>
			<Options />
			<Column title={getText('Pages')} name="pages">
				<NavigationButtons buttonsVariant="link" />
			</Column>
			<Column title={getText('Contact')} name="contact">
				{contactInfoLinks}
			</Column>
			<Copywrite />
		</footer>
	)
}

export default Footer
