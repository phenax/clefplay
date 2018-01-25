
import { h, Component } from 'preact';
import { Link } from 'preact-router/match';

import { connect } from '../store';

import PageLayout from '../layouts/PageLayout';

let isFirst = true;

export default connect('count')(
	class extends Component {

		constructor(p) {
			super(p);
			this.props.increment();
			this.props.increment();
		}

		render() {
			return ((props) => (
				<PageLayout title='My Homepage'>
					Dont you know you're riding with the king
					<div><Link href='/test'>Linkerooni</Link></div>
					<button onClick={props.increment}>++</button>
					<button onClick={props.decrement}>--</button>
					<div>{props.count}</div>
				</PageLayout>
			))(this.props);
		}
	}
);
