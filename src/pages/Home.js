
import {h} from 'preact';

import HtmlWrapper from '../layouts/HtmlWrapper';

const Head = () => (
	<div>
		
	</div>
);

export default () => (
	<HtmlWrapper head={<Head />} title='My Homepage'>
		<div id='appRoot'>
			Dont you know you're riding with the king
		</div>
	</HtmlWrapper>
);
