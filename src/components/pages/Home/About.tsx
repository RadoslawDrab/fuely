import React from 'react'

import useAppContext from '@/hooks/Other/use-app-context'

import styles from '@styles/pages/Home/About.module.scss'
import defaultStyles from '@styles/styles.module.scss'

export default function About() {
	const { getText } = useAppContext().Language
	return (
		<section className={styles.section}>
			<header className={defaultStyles.header}>
				<h2>{getText('About us')}</h2>
			</header>
			<p className={defaultStyles.text}>
				{getText(
					'Fuely is a user-friendly online tool designed to help you accurately calculate your fuel consumption, track distance traveled, estimate fuel costs, and more!'
				)}
			</p>
			<p className={defaultStyles.text}>
				{getText(
					"Whether you are planning a road trip, managing your fleet, or simply curious about your vehicle's fuel efficiency, Fuely has got you covered."
				)}
			</p>
		</section>
	)
}
