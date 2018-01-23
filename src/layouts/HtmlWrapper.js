import {h} from 'preact';


export default ({ title = 'Title', head = null, children }) => (
	<html>
		<head>
			<title>{title}</title>
			{head}
		</head>
		<body>
			{children}
		</body>
	</html>
);
