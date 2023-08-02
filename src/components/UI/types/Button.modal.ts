export type ButtonVariant = 'default' | 'dark' | 'link' | 'redirect' | 'error' | 'accent'

export interface ButtonProps {
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
	onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void
	onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void
	children?: any
	className?: string
	data?: { [key: string]: string | number | object | boolean }
	disabled?: boolean
	selected?: boolean
	variant?: ButtonVariant[] | ButtonVariant
	type?: 'button' | 'submit' | 'reset'
}
