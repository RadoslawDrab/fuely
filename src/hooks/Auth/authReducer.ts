import { Actions, State } from './types/authReducer.modal'

const initialState: State = {
	state: {
		isLoading: false,
		isLoggedIn: false,
		hasError: false,
		errorMessage: ''
	},
	user: {
		displayName: 'User',
		email: '',
		settings: {
			currency: 'usd',
			units: 'metric'
		},
		events: {}
	}
}
function reducer(state: State, action: Actions): State {
	switch (action.type) {
		case 'SET_USER': {
			return {
				...state,
				state: { ...state.state, isLoggedIn: true },
				user: { ...state.user, ...action.user }
			}
		}
		case 'LOG_OUT': {
			return {
				...state,
				state: {
					...state.state,
					isLoggedIn: false
				},
				user: {
					displayName: 'User',
					email: '',
					settings: {
						currency: 'usd',
						units: 'metric'
					},
					events: {}
				}
			}
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
