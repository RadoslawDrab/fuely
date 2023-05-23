import React from 'react'

import { className } from '@/utils'

import styles from '@styles/Layout/Section.module.scss'

interface Props {
	title: string
	children?: any
	className?: string
	contentClassName?: string
}
export default function Section(props: Props) {
	const sectionStyles = className(styles.section, props.className)
	const sectionContentStyles = className(styles.content, props.contentClassName)
	return (
		<section className={sectionStyles}>
			<h2>{props.title}</h2>
			<div className={sectionContentStyles}>{props.children}</div>
		</section>
	)
}
