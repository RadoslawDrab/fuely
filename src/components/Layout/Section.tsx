import React, { useContext } from 'react'

import { className } from '@/utils'

import { SectionProps as Props } from './types/Section.modal'

import styles from '@styles/Layout/Section.module.scss'

const Section = React.forwardRef(function Section(props: Props, ref: React.ForwardedRef<HTMLDivElement>) {
	const headingLevel = useContext(HeadingContext)

	const sectionStyles = className(styles.section, props.className)
	const sectionContentStyles = className(
		styles.content,
		props.disableContent ? styles['disable-content'] : '',
		props.contentClassName
	)
	const heading: JSX.Element = (() => {
		const { title } = props
		if (!title) return <></>
		switch (headingLevel) {
			case 1:
				return <h1>{title}</h1>
			case 2:
				return <h2>{title}</h2>
			case 3:
				return <h3>{title}</h3>
			case 4:
				return <h4>{title}</h4>
			case 5:
				return <h5>{title}</h5>
			case 6:
				return <h6>{title}</h6>
			default:
				return <span>{title}</span>
		}
	})()
	return (
		<HeadingContext.Provider value={headingLevel + 1}>
			<section className={sectionStyles}>
				{heading}
				<div ref={ref} className={sectionContentStyles}>
					{props.children}
				</div>
			</section>
		</HeadingContext.Provider>
	)
})
export default Section

const HeadingContext = React.createContext<number>(2)
