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
		// Updates user's state and data
		case 'SET_USER': {
			return {
				...state,
				state: { ...state.state, isLoggedIn: true },
				user: { ...state.user, ...action.user }
			}
		}
		// Logs user out while return default data
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
		// Updates user's events object
		case 'SET_EVENTS': {
			return { ...state, user: { ...state.user, events: action.events } }
		}
		// Updates error status
		case 'SET_ERROR': {
			return {
				...state,
				state: { ...state.state, hasError: action.errorMessage ? true : false, errorMessage: action.errorMessage || '' }
			}
		}
		// Set's loading state
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
