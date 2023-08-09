import React from 'react'

import { className } from '@/utils'

import { Feature } from './types/Features.modal'

import Icon from '@/components/UI/Icon'

import defaultStyles from '@styles/styles.module.scss'
import styles from '@styles/pages/Home/Features.module.scss'

export default function Features() {
	const features: Feature[] = [
		{
			title: 'Track Fuel Consumption',
			icon: 'chart-line',
			alt: 'chart icon',
			text: "Keep a record of your fuel usage and calculate your vehicle's fuel efficiency with ease."
		},
		{
			title: 'Monitor Distance Traveled',
			icon: 'presentation-chart',
			alt: 'monitor icon',
			text: "Stay informed about the total distance you've covered on your journeys."
		},
		{
			title: 'Estimate Fuel Costs',
			icon: 'calculator',
			alt: 'calculator icon',
			text: 'Plan your trips better with accurate fuel cost estimates for your upcoming adventures.'
		},
		{
			title: 'Graphical Analytics',
			icon: 'graph',
			alt: 'graph icon',
			text: 'Visualize your fuel consumption trends and expenses through easy-to-understand graphs.'
		}
	]

	const content = features.map((feature, index) => (
		<li key={index}>
			<header>
				<Icon type={feature.icon} alt={feature.alt} />
				<h3>{feature.title}</h3>
			</header>
			<p className={className(defaultStyles.text, defaultStyles.dark)}>{feature.text}</p>
		</li>
	))
	return (
		<section className={styles.section}>
			<header className={defaultStyles.header}>
				<h2>Key features</h2>
			</header>
			<ul>{content}</ul>
		</section>
	)
}
