import React from 'react'

import useAppContext from '@/hooks/Other/use-app-context'

import styles from '@styles/pages/Home/Privacy.module.scss'
import defaultStyles from '@styles/styles.module.scss'

export default function Privacy() {
	const { getText } = useAppContext().Language
	return (
		<section className={styles.section}>
			<header className={defaultStyles.header}>
				<h2>{getText('Privacy')}</h2>
			</header>
			<p className={defaultStyles.text}>
				{getText(
					'At Fuely, we value your privacy and security. Your data is encrypted and stored securely, and we never share your personal information with third parties.'
				)}
			</p>
		</section>
	)
}
