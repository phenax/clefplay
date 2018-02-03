
import { h, Component } from 'preact';
import { connect } from 'unistore/preact';

import playerActions from '../../../store/actions/player';

export default connect('song', playerActions)(class VisualizePlayer extends Component {

	componentDidMount() {
		// this.props.loadFile({
		// 	file: 'helloworld.mp3'
		// });
	}

	render() {
		return (
			<div>
				{song.file}
			</div>
		);
	}
})
