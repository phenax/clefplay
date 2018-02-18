
import { h } from 'preact';
import render from 'preact-render-to-string';

import Link from './Link';

test('Link render', () => {
	const tree = render(
		<Link href='/gogo'>Yo</Link>
	);

	expect(tree).toMatchSnapshot();
});
