import Head from 'next/head'
import React from 'react'

import styles from '@styles/UI/LoadingIcon.module.scss'
import Icon from './Icon'

export default function LoadingIcon() {
	return (
		<>
			<Head>
				<title>Fuely | Loading</title>
			</Head>
			<div className={styles.loading} role="status">
				<div className={styles.car}>
					<Icon type="car" alt="car icon" />
				</div>
			</div>
		</>
	)
}
