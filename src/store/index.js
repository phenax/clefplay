
import createStore from 'unistore';
import { connect as unistoreConnect } from 'unistore/preact';

import allActions from './actions';


// Store
let store;

// Create new initial state
export const getInitialState = () => ({
	count: 0,
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

/**
 * Unistore connect function wrapper
 * @param {String|Object}    state    The state you want passed
 * @param {Function}         actions  The actions you want passed(All actions by default) [TODO: Remove after test]
 * 
 * @return {Function}        This function wraps around the react component
 */
export const connect =
	(state, actions = allActions) =>
		unistoreConnect(state, actions);
