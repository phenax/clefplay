
import axios from 'axios';

export default (store) => ({

	uploadSong(state, formData) {

		axios.post('/songs/upload', formData)
			.then(console.log)

		// TODO: Save song
		// Promise.resolve(song)
		// 	.then(song => store.setState({
		// 		...state,
		// 		song: { ...state.song, ...song },
		// 	}));
	},
});
