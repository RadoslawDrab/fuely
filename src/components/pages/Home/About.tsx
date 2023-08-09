/* eslint-disable react/no-unescaped-entities */
import React from 'react'

import defaultStyles from '@styles/styles.module.scss'
import styles from '@styles/pages/Home/About.module.scss'

export default function About() {
	return (
		<section className={styles.section}>
			<header className={defaultStyles.header}>
				<h2>About us</h2>
			</header>
			<p className={defaultStyles.text}>
				Fuely is a user-friendly online tool designed to help you accurately calculate your fuel consumption, track distance
				traveled, estimate fuel costs, and more!
			</p>
			<p className={defaultStyles.text}>
				Whether you are planning a road trip, managing your fleet, or simply curious about your vehicle's fuel efficiency, Fuely
				has got you covered.
			</p>
		</section>
	)
}
