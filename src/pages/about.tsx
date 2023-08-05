import React from 'react'

import useAppContext from '@/hooks/Other/use-app-context'

import Head from '@/components/Head'

// import styles from './About.module.scss';

export default function About() {
	const { getText } = useAppContext().Language
	return (
		<>
			<Head title={`Fuely | ${getText('About app')}`} description="Fuely about page" />
			About
		</>
	)
}
