export interface GraphProps {
	items: { name?: string | JSX.Element; tooltip?: string | JSX.Element; value: number }[]
	max?: number | 'auto'
	meter?: boolean
	className?: string
	alignVertically?: boolean
	graphScaling?: {
		boundary: number
		mainValue: number
	}
}
