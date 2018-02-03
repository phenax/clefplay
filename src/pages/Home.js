
import { h } from 'preact';
import { Link } from 'preact-router/match';

import PageLayout from '../layouts/PageLayout';
import VisualizePlayer from '../components/songs/VisualizePlayer/VisualizePlayer';

export default () => (
	<PageLayout title='My Homepage'>
		Dont you know you're riding with the king
		<div><Link href='/test'>Linkerooni</Link></div>

		<div>
			<VisualizePlayer />
		</div>
	</PageLayout>
);
