import { setLocalStorage } from '@/utils'
import { Actions, State } from './AuthReducer.modal'

const initialState: State = {
	state: {
		isLoading: false,
		isLoggedIn: false,
		hasError: false,
		errorMessage: ''
	},
	user: {
		id: '',
		settings: null,
		events: {}
	}
}
function reducer(state: State, action: Actions): State {
	switch (action.type) {
		case 'SET_USER': {
			return {
				...state,
				state: { ...state.state, isLoggedIn: true },
				user: { ...state.user, id: action.id, settings: action.user }
			}
		}
		case 'LOG_OUT': {
			setLocalStorage({ token: undefined })
			return {
				...state,
				state: {
					...state.state,
					isLoggedIn: false
				},
				user: {
					id: '',
					settings: null,
					events: {}
				}
			}
		}
		case 'SET_TOKEN': {
			setLocalStorage({ token: action.token })
			return state
		}
		case 'SET_EVENTS': {
			return { ...state, user: { ...state.user, events: action.events } }
		}
		case 'SET_ERROR': {
			return {
				...state,
				state: { ...state.state, hasError: action.errorMessage ? true : false, errorMessage: action.errorMessage || '' }
			}
		}
		case 'SET_LOADING': {
			return { ...state, state: { ...state.state, isLoading: action.state } }
		}
		default:
			return state
	}
}

const exp = {
	initialState,
	reducer
}

export default exp
