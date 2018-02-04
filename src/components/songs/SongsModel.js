
import mongoose from 'mongoose';

import { ModelEntity } from '../../api';


// Songs schema
export const schema = mongoose.Schema({

	name: String,

	rating: Number,

	createAt: { type: Date, default: Date.now },

	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

}, { collection: 'songs', toObject: { virtuals: true } });


// Model and entity methods
schema.loadClass(class SongsEntity extends ModelEntity {

	static supportedFormats = [ 'audio/mp3' ];

	static checkFile(file) {

		if(file.size > 12 * 1024 * 1024) {
			return { type: 'size', message: 'The file size is too large' };
		}

		if(!SongsEntity.supportedFormats.includes(file.type)) {
			return { type: 'format', message: 'The file format is not supported' };
		}
	}

	check() {
		const song = this;

		if((song.name || '').length < 5) {
			return { field: 'name', isValid: false, message: 'Invalid name' };
		}

		return { isValid: true };
	}
});


export default mongoose.model('Song', schema);
