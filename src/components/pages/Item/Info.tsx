import React, { useState } from 'react'

import useCalculate from '@/hooks/Events/use-calculate'
import useAppContext from '@/hooks/Other/use-app-context'
import { className, getProp } from '@/utils'

import { CalculateData, FullEvent } from '@/hooks/Events/types/Events.modal'
import { InfoProps as Props } from './types/Info.modal'

import Section from '@/components/Layout/Section'
import Button from '@/components/UI/Button'
import InfoItem from './InfoItem'

import Icon from '@/components/UI/Icon'
import styles from '@styles/pages/Item/Info.module.scss'

export default function Info(props: Props) {
	const { getText } = useAppContext().Language

	const currentEvent = props.events[2]
	const { getData, compare, keys } = useCalculate(currentEvent)
	const [itemOpenStates, setItemOpenStates] = useState<boolean[]>(keys.map(() => false))

	const sections = keys.map((key, index) => {
		const data: CalculateData = getProp(getData(currentEvent), key)
		const itemKey = `${key}-${index}`

		const isOpen = itemOpenStates[index] === true
		const sectionStyles = className(styles['data-section'], isOpen ? styles.show : '')

		function toggleInfoClickHandler() {
			// Returns state of other sections and toggles state of current section
			setItemOpenStates((states) => states.map((state, id) => (id !== index ? state : !state)))
		}
		const infoItems = props.events
			.filter((event): event is FullEvent => event !== null)
			.map((event) => {
				const data: CalculateData = getProp(getData(event), key)
				const isCurrent = currentEvent.fullId === event.fullId
				const percent = getProp(compare(event), key)
				return {
					value: data.value.toFixed(data.decimals ?? 2),
					unit: data.unitType,
					date: event.date,
					isCurrent,
					percent
				}
			})

		return (
			<div key={itemKey} className={sectionStyles}>
				<header>
					<span className={styles.name}>{data.name}</span>
					<span className={styles.value} data-unit={data.unitType}>
						{data.value.toFixed(data.decimals ?? 2)}
					</span>
					<Button variant="redirect" className={styles.button} onClick={toggleInfoClickHandler}>
						<Icon type="caret-left" alt="unfold icon" className={styles.icon} />
					</Button>
				</header>
				<Section>
					<InfoItem item={data} items={infoItems} />
				</Section>
			</div>
		)
	})

	return (
		<Section title={getText('Event')} className={styles.section} contentClassName={styles['section-content']}>
			{sections}
		</Section>
	)
}
