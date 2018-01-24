
import createStore from 'unistore';
import { connect as unistoreConnect } from 'unistore/preact';

import allActions from './actions';

const store = createStore({
	count: 0,
});

export default store;

export const connect =
	(stateNameToMap, actions = allActions) =>
		unistoreConnect(stateNameToMap, actions);
