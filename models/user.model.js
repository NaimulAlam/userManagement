const mongoose = require('mongoose');

const Users = new mongoose.Schema(
    {
        alias: { type: String, required: true },
        name: { type: String, required: true },
        surname: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phone: { type: String, required: true },
        password: { type: String, required: true },
        address: {
            country: { type: String, required: true },
            city: { type: String, required: true },
            street: { type: String, required: true },
            zipCode: { type: String, required: true },
        },
    },
    { collection: 'Users' }
);

Users.methods.toJSON = function removePass() {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};

const model = mongoose.model('UsersData', Users);

module.exports = model;
