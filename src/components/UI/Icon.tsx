import React from 'react'
import Image from 'next/image'

import { className } from '@/utils'

import { Props } from '@/types/UI/Icon.modal'

import styles from '@styles/UI/Icon.module.scss'

export default function Icon(props: Props) {
	const iconStyles = className(styles.icon, 'icon', props.className)

	// Imports icon based on `type` from `props`
	const icon = require(`/public/icons/svg/${props.type}.svg`)

	// Checks if icon contains any source
	if (!icon?.default?.src) {
		return <>No icon found</>
	}

	const iconSource = icon.default.src

	return <Image className={iconStyles} src={iconSource} alt={props.alt} width={props.width} height={props.height} />
}
