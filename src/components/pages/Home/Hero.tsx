import React from 'react'

import useAppContext from '@/hooks/Other/use-app-context'

import { HeroProps as Props } from './types/Hero.modal'

import Icon from '@/components/UI/Icon'

import styles from '@styles/pages/Home/Hero.module.scss'

export default function Hero(props: Props) {
	const { getText } = useAppContext().Language

	return (
		<section className={styles.section}>
			<header>
				<h1 className={styles.heading}>Fuely</h1>
				<h2 className={styles.heading}>{getText('Track. Analyze. Optimize.')}</h2>
				<span className={styles.subheading}>{getText('Unlock the Power of Fuel Efficiency')}</span>
				<button className={styles.button} onClick={props.scrollToCTA}>
					<span>{getText('Get Started')}</span>
					<Icon type="caret-right" alt="get started icon" />
				</button>
			</header>
			<div className={styles.background}></div>
		</section>
	)
}
