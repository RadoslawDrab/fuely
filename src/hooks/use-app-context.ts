import { useContext } from 'react'
import { AppContext } from '@/context/appContext'

function useAppContext() {
	const context = useContext(AppContext)
	return context
}

export default useAppContext
