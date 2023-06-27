export interface SelectProps {
	id?: string
	name?: string
	className?: string
	options: { name?: any; value: string; selected?: boolean }[]
	getValue?: (value: string) => void
	onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
	onFocus?: (event: React.FocusEvent<HTMLSelectElement>) => void
	onBlur?: (event: React.FocusEvent<HTMLSelectElement>) => void
}
