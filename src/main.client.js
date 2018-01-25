
import {h, render} from 'preact';

import App from './App';

const $appRoot = document.getElementById('appRoot');

// Empty the div
while ($appRoot.firstChild)
	$appRoot.removeChild($appRoot.firstChild);

// Render component
render(<App />, $appRoot);
