export interface SelectProps {
	id?: string
	name?: string
	className?: string
	wrapperClassName?: string
	options: (Option | null)[]
	getValue?: (value: string) => void
	onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
	onFocus?: (event: React.FocusEvent<HTMLSelectElement>) => void
	onBlur?: (event: React.FocusEvent<HTMLSelectElement>) => void
	data?: { [key: string]: number | string | boolean | object }
	useDefaultValue?: boolean
}
export type Option = { name?: any; value: string; selected?: boolean, className?: string }