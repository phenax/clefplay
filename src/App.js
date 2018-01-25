
import { h } from 'preact';
import { Router } from 'preact-router';
import { Provider } from 'unistore/preact';

import { getStore } from './store';

import HomePage from './pages/Home';
const Test = () => <div>Hello</div>;

// The app common to both the client side and the server side
export default ({ url = null }) => (
	<Provider store={getStore()}>
		<Router url={url}>

			<HomePage path={'/'} />

			<Test path={'/test'} />

		</Router>
	</Provider>
);
