import React from 'react'

import { className } from '@/utils'

import { SectionProps as Props } from './types/Section.modal'

import styles from '@styles/Layout/Section.module.scss'

const Section = React.forwardRef(function Section(props: Props, ref: React.ForwardedRef<HTMLDivElement>) {
	const sectionStyles = className(styles.section, props.className)
	const sectionContentStyles = className(
		styles.content,
		props.disableContent ? styles['disable-content'] : '',
		props.contentClassName
	)
	return (
		<section className={sectionStyles}>
			{props.title && <h2>{props.title}</h2>}
			<div ref={ref} className={sectionContentStyles}>
				{props.children}
			</div>
		</section>
	)
})
export default Section
