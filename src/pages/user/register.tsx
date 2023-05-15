import React from 'react'
import { useRouter } from 'next/router'

import useAppContext from '@/hooks/use-app-context'
import useUserRedirect from '@/hooks/use-user-redirect'

import Layout from '@/components/Layout/Layout'
import Button from '@/components/UI/Button'

export default function Register() {
	const router = useRouter()
	const { register } = useAppContext().Auth

	useUserRedirect()

	function registerUser() {
		register('Radek', 'Password')
			.then(() => {
				router.replace('/user/login')
			})
			.catch((error) => {
				console.log(error)
			})
	}
	return (
		<Layout>
			<Button onClick={registerUser}>Register</Button>
		</Layout>
	)
}
