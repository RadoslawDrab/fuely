export type Variant = 'default' | 'dark' | 'link'

export interface Props {
	onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
	onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void
	onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void
	children?: any
	className?: string
	data?: { [key: string]: string | number | object | boolean }
	disabled?: boolean
	selected?: boolean
	variant?: Variant[] | Variant
}
