import React from 'react'

import { className } from '@/utils'

import { DashboardControlsProps } from './types/DashboardControls.modal'

import Button from '@/components/UI/Button'
import Icon from '@/components/UI/Icon'

import styles from '@styles/Layout/Dashboard/DashboardControls.module.scss'

export default function DashboardControls(props: DashboardControlsProps) {
	return (
		<div className={className(styles.controls, 'controls')}>
			<Button onClick={props.changeCurrentPage} data={{ amount: -props.maxSkip }} variant="redirect">
				<Icon type="caret-double-left" alt="previous page icon" />
			</Button>
			<Button onClick={props.changeCurrentPage} data={{ amount: -1 }} variant="redirect">
				<Icon type="caret-left" alt="previous page icon" />
			</Button>
			<span>
				{props.currentPage + 1} / {props.pagesCount}
			</span>
			<Button onClick={props.changeCurrentPage} data={{ amount: 1 }} variant="redirect">
				<Icon type="caret-right" alt="next page icon" />
			</Button>
			<Button onClick={props.changeCurrentPage} data={{ amount: props.maxSkip }} variant="redirect">
				<Icon type="caret-double-right" alt="next page icon" />
			</Button>
		</div>
	)
}
