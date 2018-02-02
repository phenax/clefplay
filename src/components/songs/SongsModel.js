
import mongoose from 'mongoose';

import { ModelEntity } from '../../api';


// Songs schema
export const schema = mongoose.Schema({

	name: String,

	url: String,

	description: Number,

	rating: Number,

	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

}, { collection: 'songs', toObject: { virtuals: true } });

schema.loadClass(class extends ModelEntity {
	check() {
		return { isValid: true };
	}
});

export default mongoose.model('Song', schema);
