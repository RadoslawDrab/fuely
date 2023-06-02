import React from 'react'

import styles from '@styles/UI/LoadingIcon.module.scss'
import Icon from './Icon'

export default function LoadingIcon() {
	return (
		<div className={styles.loading}>
			<div className={styles.car}>
				<Icon type="car" alt="car icon" />
			</div>
		</div>
	)
}
