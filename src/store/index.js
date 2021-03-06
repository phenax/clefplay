
import createStore from 'unistore';

// Store
let store;

// Create new initial state
export const getInitialState = () => ({
	song: null,
});

/**
 * Getter for the store object
 */
export const getStore = () => {

	// If store exists, return that, else, create new
	if(store) return store;

	let initialState;

	// If it is a browser, use the initial state that was passed
	if(process.env.ENV === 'browser') {
		initialState = window.__INITIAL_STATE || getInitialState();
	} else {
		initialState = getInitialState();
	}

	store = createStore(initialState);
	return store;
};

/**
 * Refresh the store to its initial state
 */
export const refreshStore = () => {
	store = createStore(getInitialState());
	return store;
};

