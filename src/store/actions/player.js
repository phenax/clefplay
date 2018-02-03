

export default (store) => ({

	loadFile: (state, song) => {

		// TODO: Save song
		Promise.resolve(song)
			.then(song => store.setState({
				...state,
				song: { ...state.song, ...song },
			}));
	},
});
