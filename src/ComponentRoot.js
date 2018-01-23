
import {h} from 'preact';
import { Router } from 'preact-router';

import HomePage from './pages/Home';
const Test = () => <div>Hello</div>;

export default ({ url = null }) => (
	<Router url={url}>
		<HomePage path={'/'} />
		<Test path={'/test'} />
	</Router>
);
