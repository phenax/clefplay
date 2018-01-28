
import mongoose from 'mongoose';

export const schema = mongoose.Schema({
	name: String,
	email: String,
}, { collection: 'users' });

Object.assign(schema.methods, {
	// Entity methods
});


const model = mongoose.model('User', schema);

export default Object.assign(model, {
	// Table methods
});
