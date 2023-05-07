import icons from '@/data/icons'

export type Icons = (typeof icons)[number]

export interface Props {
	width: number
	height: number
	alt: string
	type: Icons
	className?: string
}
