import React from 'react'
import Image from 'next/image'

import { className } from '@/utils'

import { IconProps as Props } from '@/components/UI/types/Icon.modal'

import styles from '@styles/UI/Icon.module.scss'

export default function Icon(props: Props) {
	const iconStyles = className(styles.icon, 'icon', props.className)

	// Imports icon based on `type` from `props`
	const icon = require(`/public/icons/${props.type}.svg`)

	// Checks if icon contains any source
	if (!icon?.default?.src) {
		return <>No icon found</>
	}

	const iconSource = icon.default.src

	return <Image className={iconStyles} src={iconSource} alt={props.alt} width={1024} height={1024} />
}
