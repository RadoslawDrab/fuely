import { useRouter } from 'next/router'
import React from 'react'

import useAppContext from '@/hooks/Other/use-app-context'
import usePages from '@/hooks/Pages/use-pages'

import { NavigationButtonsProps as Props } from '../types/NavigationButtons.modal'

import Button from '../../UI/Button'
import Icon from '../../UI/Icon'

export default function NavigationButtons(props: Props) {
	const router = useRouter()

	const { getText } = useAppContext().Language
	const { availablePages } = usePages()

	// Changes url based on path
	function navigate(event: React.MouseEvent<HTMLButtonElement>) {
		const url = event.currentTarget.dataset.path ?? '/'
		router.push(url)
	}

	const navigationButtons = availablePages.map((item, i) => {
		const isCurrentPath = item.path === router.pathname
		return (
			<li key={i} className={`${item.name}-item`}>
				<Button
					onClick={navigate}
					className={`${item.name}-button`}
					selected={isCurrentPath}
					data={item.path ? { path: item.path } : {}}
					variant={props.buttonsVariant}>
					<Icon type={item.icon} alt={`${item.name} icon`} />
					<span>{getText(item.display)}</span>
				</Button>
			</li>
		)
	})
	return <>{navigationButtons}</>
}
