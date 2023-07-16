export interface GraphProps {
	items: { name?: string | JSX.Element; tooltip?: string | JSX.Element; value: number }[]
	max?: number
	meter?: boolean
	className?: string
	alignVertically?: boolean
}
