
import mongoose from 'mongoose';

import { ModelEntity } from '../../api';


// Songs schema
export const schema = mongoose.Schema({

	name: String,

	rating: Number,

	createAt: { type: Date, default: Date.now },

	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

}, { collection: 'songs', toObject: { virtuals: true } });

schema.loadClass(class extends ModelEntity {
	check() {
		const song = this;

		if((song.name || '').length < 5) {
			return { field: 'name', isValid: false, message: 'Invalid name' };
		}

		return { isValid: true };
	}
});

export default mongoose.model('Song', schema);
