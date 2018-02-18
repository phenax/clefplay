
import { h, Component } from 'preact';
import { connect } from 'unistore/preact';

import playerActions from '../../../store/actions/player';

export default connect('song', playerActions)(class VisualizePlayer extends Component {

	componentDidMount() {
		
		this.$audio = new Audio();
		this.$audio.src = '/songs/listen/5a76b3f0f59f0f2a7caf5f7c.mp3';
		this.$audio.autoplay = true;

		// console.dir(this.$audio);
		window.__audio = this.$audio;

		if(this.$audio) {

			var duration =  this.$audio.duration;
		    if (duration > 0) {
		       	for (var i = 0; i < this.$audio.buffered.length; i++) {
		            if (this.$audio.buffered.start(this.$audio.buffered.length - 1 - i) < this.$audio.currentTime) {
		                document.getElementById("buffered-amount").style.width = (this.$audio.buffered.end(this.$audio.buffered.length - 1 - i) / duration) * 100 + "%";
		                break;
		            }
		        }
		    }

			// this.$audio.addEventListener('seeked', this.onSeek.bind(this));
			this.$audio.addEventListener('progress', () => {
			    var duration =  this.$audio.duration;
			    if (duration > 0) {
			       	for (var i = 0; i < this.$audio.buffered.length; i++) {
			            if (this.$audio.buffered.start(this.$audio.buffered.length - 1 - i) < this.$audio.currentTime) {
			                document.getElementById("buffered-amount").style.width = (this.$audio.buffered.end(this.$audio.buffered.length - 1 - i) / duration) * 100 + "%";
			                break;
			            }
			        }
			    }
			});
			this.$audio.addEventListener('timeupdate', () => {
				var duration =  this.$audio.duration;
				if(duration > 0) {
					document.getElementById('progress-amount').textContent =
						`${Math.floor(this.$audio.currentTime)}/${Math.floor(duration)}`;
					document.getElementById('progress-amount').style.width =
						((this.$audio.currentTime / duration)*100) + "%";
				}
			});
		}
	}


	playToggle() {
		this.$audio.paused? this.$audio.play(): this.$audio.pause();
	}

	changeProgress(ratio) {
		this.$audio.currentTime = ratio * this.$audio.duration;
	}

	render() {

		const song = this.props.song || {};

		return (
			<div>
				<button onClick={this.playToggle.bind(this)}>Play/Pause</button>
				<input
					type='range'
					min={0} max={100} value={0}
					onChange={e => this.changeProgress(e.currentTarget.value/100)}
				/>
				<br />
				<br />
				<div class="buffered">
					<span id="buffered-amount"></span>
				</div>
				<div class="progress">
					<span id="progress-amount"></span>
				</div>
			</div>
		);
	}
})
