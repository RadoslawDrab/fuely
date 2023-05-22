import React from 'react'

import Icon from '@/components/UI/Icon'

import styles from '@styles/Layout/Footer/Copywrite.module.scss'

export default function Copywrite() {
	return (
		<div className={styles.copywrite}>
			<div className={styles.logo}>
				<Icon type="logo" alt="logo icon" />
				<span>Fuely</span>
			</div>
			<span>&copy; Radosław Drab</span>
		</div>
	)
}
