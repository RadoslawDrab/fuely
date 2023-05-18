import React from 'react'

import styles from '@styles/Layout/Section.module.scss'

interface Props {
	children?: any
	title: string
}
export default function Section(props: Props) {
	return (
		<section className={styles.section}>
			<h2>{props.title}</h2>
			<div className={styles['section-content']}>{props.children}</div>
		</section>
	)
}
