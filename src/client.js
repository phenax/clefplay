
import {h, render} from 'preact';

import ComponentRoot from './ComponentRoot';

const $appRoot = document.getElementById('appRoot');

// Empty the div
while ($appRoot.firstChild)
	$appRoot.removeChild($appRoot.firstChild);

// Render component
render(<ComponentRoot />, $appRoot);
