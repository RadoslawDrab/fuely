import Head from 'next/head'
import React from 'react'
import { createPortal } from 'react-dom'

import { useLayoutContext } from '@/context/layoutContext'
import { className } from '@/utils'

import { LoadingIconProps as Props } from './types/LoadingIcon.modal'

import Icon from './Icon'

import styles from '@styles/UI/LoadingIcon.module.scss'

export default function LoadingIcon(props: Props) {
	const { mainContainerRef } = useLayoutContext()

	const loadingIconStyles = className(styles.loading, 'loading-icon', props.center ? styles.center : '')
	const type = props.type || 'spinner'

	const content = (
		<>
			<Head>
				<title>Fuely | Loading</title>
			</Head>
			<div className={loadingIconStyles} role="status">
				{type === 'spinner' && <div className={styles.spinner}></div>}
				{type === 'car' && (
					<div className={styles.car}>
						<div className={styles.vehicle}>
							<Icon type="car" alt="car icon" />
						</div>
					</div>
				)}
			</div>
		</>
	)

	const parent = props.parent?.current ?? mainContainerRef?.current
	if (parent && props.center) return createPortal(content, parent)
	return <>{content}</>
}
