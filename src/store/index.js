
import createStore from 'unistore';
import { connect as unistoreConnect } from 'unistore/preact';

import allActions from './actions';

export const getInitialState = () => ({
	count: 0,
});


let store;

export const getStore = () => {

	if(store) return store;

	let initialState;

	if(process.env.ENV === 'browser') {
		initialState = window.__INITIAL_STATE || getInitialState();
	} else {
		initialState = getInitialState();
	}

	store = createStore(initialState);
	return store;
};


export const refreshStore = () => {
	store = createStore(getInitialState());
	return store;
};


export const connect =
	(stateNameToMap, actions = allActions) =>
		unistoreConnect(stateNameToMap, actions);
