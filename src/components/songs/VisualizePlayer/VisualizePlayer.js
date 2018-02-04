
import { h, Component } from 'preact';
import { connect } from 'unistore/preact';

import playerActions from '../../../store/actions/player';

export default connect('song', playerActions)(class VisualizePlayer extends Component {

	componentDidMount() {
		
	}

	onFormSubmit(e) {
		e.preventDefault();

		this.props.uploadSong(new FormData(e.currentTarget));
	}

	render() {

		const song = this.props.song || {};

		return (
			<div>
				<form onSubmit={this.onFormSubmit.bind(this)}>
					<input type='file' name='song' />
					<input type='text' placeholder='Song name' value='Hail the apocalypse' name='name' />
					<button type='submit'>Upload</button>
				</form>
			</div>
		);
	}
})
