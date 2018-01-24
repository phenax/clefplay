
import {h} from 'preact';
import { Router } from 'preact-router';
import { Provider } from 'unistore/preact';

import store from './store';

import HomePage from './pages/Home';
const Test = () => <div>Hello</div>;

export default ({ url = null }) => (
	<Provider store={store}>
		<Router url={url}>
			<HomePage path={'/'} />
			<Test path={'/test'} />
		</Router>
	</Provider>
);
