import icons from '@/data/icons'

export type Icons = (typeof icons)[number]

export interface Props {
	alt: string
	type: Icons
	className?: string
}
