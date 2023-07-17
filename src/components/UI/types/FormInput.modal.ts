export interface FormInputProps {
	name?: string
	id: string
	text: string
	placeholder?: string
	type: React.HTMLInputTypeAttribute
	notRequired?: boolean
	errorText?: string
	min?: number
	max?: number
	value?: any
	defaultValue?: any
	defaultChecked?: boolean
	getValue?: (value: string) => void
	getValueOnBlur?: (value: string) => void
	check?: (value: string) => boolean
}
