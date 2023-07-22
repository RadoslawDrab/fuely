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
	inputData?: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
	getValue?: (value: string) => void
	getValueOnBlur?: (value: string) => void
	check?: (value: string) => boolean
}
