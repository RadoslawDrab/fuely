import React from 'react'

import defaultStyles from '@styles/styles.module.scss'
import styles from '@styles/pages/Home/HowItWorks.module.scss'

export default function HowItWorks() {
	const texts = [
		'Sign up for a free account or log in to your existing account.',
		'Start recording your trips and fuel purchases.',
		'Get insights into your expenses and fuel consumption patterns with easy-to-read graphs.',
		'Plan your trips smarter.'
	]

	const content = texts.map((text, index) => (
		<li key={index} className={defaultStyles.text} data-index={index + 1}>
			<p>{text}</p>
		</li>
	))
	return (
		<section className={styles.section}>
			<header className={defaultStyles.header}>
				<h2>How it works?</h2>
			</header>
			<ol>{content}</ol>
		</section>
	)
}
