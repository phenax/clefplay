
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const NAME_INVALID = { isValid: false, status: 442, message: 'Name needs to be atleast 4 characters long' };
const EMAIL_INVALID = { isValid: false, status: 443, message: 'Email address is invalid' };

import mongoose from 'mongoose';

export const schema = mongoose.Schema({
	name: String,
	email: String,
}, { collection: 'users' });

Object.assign(schema.methods, {
	check() {

		const user = this;

		if (!user.name || user.name.length < 4)
			return NAME_INVALID;

		if (!user.email || !EMAIL_REGEX.test(user.email))
			return EMAIL_INVALID;

		return { isValid: true };
	}
});


const model = mongoose.model('User', schema);

export default Object.assign(model, {
	// Table methods
});
