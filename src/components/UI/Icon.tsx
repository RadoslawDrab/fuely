import React from 'react'
import Image from 'next/image'

import { className } from '@/utils'
import useAppContext from '@/hooks/Other/use-app-context'

import { IconProps as Props } from '@/components/UI/types/Icon.modal'

import styles from '@styles/UI/Icon.module.scss'

export default function Icon(props: Props) {
	const { getText } = useAppContext().Language

	const iconStyles = className(styles.icon, 'icon', props.className)

	// Imports icon based on `type` from `props`
	const icon = require(`/public/icons/${props.type}.svg`)

	// Checks if icon contains any source
	if (!icon?.default?.src) {
		return <>{getText('Icon not found')}</>
	}

	const iconSource = icon.default.src

	return <Image className={iconStyles} src={iconSource} alt={props.alt} width={1024} height={1024} />
}
