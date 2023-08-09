import { ChangeEvent, FocusEvent, HTMLInputTypeAttribute } from 'react'
import { Icons } from './Icon.modal'

export interface InputProps {
	type: HTMLInputTypeAttribute
	className?: string
	name?: string
	placeholder?: string
	value?: string
	defaultValue?: string
	defaultChecked?: boolean
	checked?: boolean
	id?: string
	disabled?: boolean
	min?: number
	max?: number
	data?: { [key: string]: number | string | boolean | object }
	icon?: Icons
	rightText?: string
	inputData?: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
	onChange: (event: ChangeEvent<HTMLInputElement>) => void
	onBlur?: (event: FocusEvent<HTMLInputElement>) => void
	onFocus?: (event: FocusEvent<HTMLInputElement>) => void
}
