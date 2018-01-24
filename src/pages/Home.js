
import { h } from 'preact';
import { Link } from 'preact-router/match';

import PageLayout from '../layouts/PageLayout';

export default () => (
	<PageLayout title='My Homepage'>
		Dont you know you're riding with the king
		<div>
			<Link href='/test'>Linkerooni</Link>
		</div>
	</PageLayout>
);
