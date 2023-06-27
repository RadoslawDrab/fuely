import Head from 'next/head'
import React from 'react'

import { className } from '@/utils'

import { LoadingIconProps as Props } from './types/LoadingIcon.modal'

import Icon from './Icon'

import styles from '@styles/UI/LoadingIcon.module.scss'

export default function LoadingIcon(props: Props) {
	const loadingIconStyles = className(styles.loading, 'loading-icon', props.center ? styles.center : '')
	return (
		<>
			<Head>
				<title>Fuely | Loading</title>
			</Head>
			<div className={loadingIconStyles} role="status">
				<div className={styles.car}>
					<Icon type="car" alt="car icon" />
				</div>
			</div>
		</>
	)
}
