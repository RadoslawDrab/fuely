import React from 'react'

import { className } from '@/utils'

import { SectionProps as Props } from './types/Section.modal'

import styles from '@styles/Layout/Section.module.scss'

export default function Section(props: Props) {
	const sectionStyles = className(styles.section, props.className)
	const sectionContentStyles = className(
		styles.content,
		props.disableContent ? styles['disable-content'] : '',
		props.contentClassName
	)
	return (
		<section className={sectionStyles}>
			{props.title && <h2>{props.title}</h2>}
			<div className={sectionContentStyles}>{props.children}</div>
		</section>
	)
}
