
import mongoose from 'mongoose';

const NAME_INVALID = { isValid: false, status: 442, message: 'Name needs to be atleast 4 characters long' };

export const schema = mongoose.Schema({
	name: String,
	url: String,
	description: Number,
	rating: Number,
	uid: mongoose.Schema.Types.ObjectId,
}, { collection: 'songs' });

Object.assign(schema.methods, {
	check() {
		// const song = this;

		// if (!song.name || song.name.length < 4)
		// 	return NAME_INVALID;

		return { isValid: true };
	}
});

Object.assign(schema.statics, {
	// Table methods
});

export default mongoose.model('Songs', schema);
