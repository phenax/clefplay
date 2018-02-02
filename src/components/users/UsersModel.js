
import mongoose from 'mongoose';

import { ModelEntity } from '../../api';

// Email validation regex(Replaced the over complicated one)
const EMAIL_REGEX = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/;

export const schema = mongoose.Schema({

	name: String,

	email: String,

}, { collection: 'users', toObject: { virtuals: true } });


schema.virtual('songs', {
	ref: 'Song',
	localField: '_id',
	foreignField: 'user',
});

schema.loadClass(class extends ModelEntity {

	check() {

		const user = this;

		if (!user.name || user.name.length < 4)
			return { isValid: false, field: 'name', message: 'Name needs to be atleast 4 characters long' };

		if (!user.email || !EMAIL_REGEX.test(user.email))
			return { isValid: false, field: 'email', message: 'Email address is invalid' };

		return { isValid: true };
	}
});

export default mongoose.model('User', schema);
