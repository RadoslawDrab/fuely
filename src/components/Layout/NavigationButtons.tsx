import React from 'react'
import { useRouter } from 'next/router'

import usePages from '@/hooks/use-pages'
import useAppContext from '@/hooks/use-app-context'
import { Variant } from '@type/UI/Button.modal.ts'

import Button from '../UI/Button'
import Icon from '../UI/Icon'

interface Props {
	buttonsVariant: Variant
}
export default function NavigationButtons(props: Props) {
	const router = useRouter()

	const { getText } = useAppContext().Language
	const { availablePages } = usePages()

	// Changes url based on path
	function navigate(event: React.MouseEvent<HTMLButtonElement>) {
		const url = event.currentTarget.dataset.path ?? '/'
		router.replace(url)
	}

	const navigationButtons = availablePages.map((item, i) => {
		const isCurrentPath = item.path === router.pathname
		return (
			<li key={i}>
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
