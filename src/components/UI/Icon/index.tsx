import React from 'react'
import styles from './Icon.module.scss'
import Image from 'next/image'

import logo from '../../../../public/icons/svg/logo.svg'

interface Props {
	width: number
	height: number
	alt: string
}
export default function Icon(props: Props) {
	return <Image src={logo.src} alt={props.alt} width={props.width} height={props.height}></Image>
}
