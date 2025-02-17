import { Actions, State } from './types/authReducer.modal'

const initialState: State = {
	state: {
		isLoading: false,
		isLoggedIn: false,
		hasError: false,
		hasVehicles: false,
		errorMessage: ''
	},
	user: {
		displayName: 'User',
		email: '',
		settings: {
			currency: 'usd',
			units: 'metric',
			vehicles: []
		},
		events: {}
	}
}
function reducer(state: State, action: Actions): State {
	switch (action.type) {
		// Updates user's state and data
		case 'SET_USER': {
			state.state.isLoggedIn = true
			state.state.hasVehicles = action.user.settings.vehicles.length > 0

			state.user = { ...state.user, ...action.user }
			return state
		}
		// Logs user out while return default data
		case 'LOG_OUT': {
			return Object.assign({}, initialState)
		}
		// Updates user's events object
		case 'SET_EVENTS': {
			return { ...state, user: { ...state.user, events: action.events } }
		}
		// Updates error status
		case 'SET_ERROR': {
			return {
				...state,
				state: { ...state.state, hasError: !!action.errorMessage, errorMessage: action.errorMessage || '' }
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
