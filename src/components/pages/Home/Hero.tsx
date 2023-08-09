import React from 'react'

import { HeroProps as Props } from './types/Hero.modal'

import Icon from '@/components/UI/Icon'

import styles from '@styles/pages/Home/Hero.module.scss'

export default function Hero(props: Props) {
	return (
		<section className={styles.section}>
			<header>
				<h1 className={styles.heading}>Fuely</h1>
				<h2 className={styles.heading}>Track. Analyze. Optimize.</h2>
				<span className={styles.subheading}>Unlock the Power of Fuel Efficiency</span>
				<button className={styles.button} onClick={props.scrollToCTA}>
					<span>Get Started</span>
					<Icon type="caret-right" alt="get started icon" />
				</button>
			</header>
			<div className={styles.background}></div>
		</section>
	)
}
