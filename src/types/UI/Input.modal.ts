import { ChangeEvent, FocusEvent, HTMLInputTypeAttribute } from 'react'

export interface Props {
	type: HTMLInputTypeAttribute
	className?: string
	placeholder?: string
	defaultValue?: string
	id?: string
	disabled?: boolean
	min?: number
	max?: number
	data?: { [key: string]: number | string | boolean | object }
	onChange: (event: ChangeEvent<HTMLInputElement>) => void
	onBlur?: (event: FocusEvent<HTMLInputElement>) => void
	onFocus?: (event: FocusEvent<HTMLInputElement>) => void
}
