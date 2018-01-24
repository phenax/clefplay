
const combineActions = () => null;

const number = (store = { count: 0 }) => ({
	increment: (state) => ({ ...state, count: state.count + 1 }),
	decrement: (state) => ({ ...state, count: state.count - 1 }),
});

export default number;
