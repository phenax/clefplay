
import { h } from 'preact';


export default ({ href, children, ...props }) => (
	<a href={href} cool='wow' {...props}>
		{children}
	</a>
);
