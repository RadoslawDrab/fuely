import React from 'react'

import defaultStyles from '@styles/styles.module.scss'
import styles from '@styles/pages/Home/Privacy.module.scss'

export default function Privacy() {
	return (
		<section className={styles.section}>
			<header className={defaultStyles.header}>
				<h2>Privacy</h2>
			</header>
			<p className={defaultStyles.text}>
				At Fuely, we value your privacy and security. Your data is encrypted and stored securely, and we never share your personal
				information with third parties.
			</p>
		</section>
	)
}
