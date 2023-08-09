import React from 'react'

import useAppContext from '@/hooks/Other/use-app-context'
import { className } from '@/utils'

import { Feature } from './types/Features.modal'

import Icon from '@/components/UI/Icon'

import styles from '@styles/pages/Home/Features.module.scss'
import defaultStyles from '@styles/styles.module.scss'

export default function Features() {
	const { getText } = useAppContext().Language
	const features: Feature[] = [
		{
			title: getText('Track Fuel Consumption'),
			icon: 'chart-line',
			alt: 'chart icon',
			text: getText("Keep a record of your fuel usage and calculate your vehicle's fuel efficiency with ease.")
		},
		{
			title: getText('Monitor Distance Traveled'),
			icon: 'presentation-chart',
			alt: 'monitor icon',
			text: getText("Stay informed about the total distance you've covered on your journeys.")
		},
		{
			title: getText('Estimate Fuel Costs'),
			icon: 'calculator',
			alt: 'calculator icon',
			text: getText('Plan your trips better with accurate fuel cost estimates for your upcoming adventures.')
		},
		{
			title: getText('Graphical Analytics'),
			icon: 'graph',
			alt: 'graph icon',
			text: getText('Visualize your fuel consumption trends and expenses through easy-to-understand graphs.')
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
				<h2>{getText('Key features')}</h2>
			</header>
			<ul>{content}</ul>
		</section>
	)
}
