/* eslint-disable no-underscore-dangle */
const express = require('express');

const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// const { ObjectId } = require('mongodb');
const User = require('./models/user.model');
const Admin = require('./models/admin.model');

// const { MongoClient } = require('mongodb');
// const fileUpload = require('express-fileupload');

const port = process.env.PORT || 5000;
require('dotenv').config();

app.use(cors());
app.use(express.json());

// app.use(fileUpload());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vwf4i.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(uri);

async function verifyToken(req, res, next) {
    const umtoken = req.headers['x-access-token'];
    if (!umtoken) {
        try {
            const decoded = jwt.verify(umtoken, 'secret123');
            const { email } = decoded;
            const LoggedUser = await User.findOne({ email });

            return res.json({ status: 'ok', LoggedUser });
        } catch (err) {
            // console.log(err);
            return res.json({ status: 'error', message: 'Invalid User' });
        }
    }
    return next();
}

async function run() {
    try {
        // Main route
        app.get('/', (req, res) => {
            res.send('Hello! form Goods4Love');
        });

        // registration route api
        //
        app.post('/register', async (req, res) => {
            console.log(req.body);
            try {
                const newPassword = await bcrypt.hash(req.body.password, 10);

                await User.create({
                    alias: req.body.alias,
                    name: req.body.name,
                    surname: req.body.surname,
                    email: req.body.email,
                    phone: req.body.phone,
                    password: newPassword,
                    address: {
                        country: req.body.address.country,
                        city: req.body.address.city,
                        street: req.body.address.street,
                        zipCode: req.body.address.zipCode,
                    },
                });
                return res.json({ status: 'OK', message: 'Sign Up Successfull' });
            } catch (err) {
                // console.error(err);
                return res.json({ status: 'error', message: err });
            }
        });

        // all users route mongoose query
        //
        app.get('/users', verifyToken, async (req, res) => {
            try {
                const users = await User.find().all('users-data', []);
                return res.json({ status: 'ok', users });
            } catch (err) {
                // console.log(err);
                return res.json({ status: 'error', message: err });
            }
        });

        // Login route api
        //
        app.post('/login', async (req, res) => {
            try {
                const userLogin = await User.findOne({
                    email: req.body.email,
                });

                if (!userLogin) {
                    return res.json({ status: 'error', error: 'Invalid Login' });
                }
                const isPasswordValid = await bcrypt.compare(req.body.password, userLogin.password);

                if (isPasswordValid) {
                    const umtoken = jwt.sign(
                        {
                            id: userLogin._id,
                            name: userLogin.name,
                            surname: userLogin.surname,
                            email: userLogin.email,
                            phone: userLogin.phone,
                            address: userLogin.address,
                        },
                        'secret123'
                    );

                    return res.json({ status: 'ok', userToken: umtoken });
                }
                return res.json({ status: 'error', user: false });
            } catch (err) {
                // console.error(err);
                return res.json({ status: 'error', message: err });
            }
        });

        // loggedIn user information mongoose
        //
        app.get('/userInfo', async (req, res) => {
            const umtoken = req.headers['x-access-token'];

            try {
                const decoded = jwt.verify(umtoken, 'secret123');
                const { id } = decoded;
                const userInfo = await User.findOne({ id });
                // console.log(userInfo);
                return res.json({ status: 'ok', userInfo });
            } catch (err) {
                // console.log(err);
                return res.json({ status: 'error', message: 'Invalid User' });
            }
        });
        // loggedIn user information mongoose
        //
        app.get('/userInfo/:id', async (req, res) => {
            try {
                const user = await User.findOne({ _id: req.params.id });
                // console.log(userInfo);
                return res.json({ status: 'ok', user });
            } catch (err) {
                // console.log(err);
                return res.json({ status: 'error', message: 'Invalid User' });
            }
        });

        // user delete route mongoose
        app.get('/delete/:id', async (req, res) => {
            try {
                const _id = req.params.id;
                console.log(_id);
                await User.deleteOne({ _id });
                return res.json({ status: 'ok', message: 'User Deleted' });
            } catch (err) {
                // console.log(err);
                return res.json({ status: 'error', message: 'Invalid User' });
            }
        });

        // update user information mongoose
        //
        app.post('/updateUserInfo', async (req, res) => {
            const umtoken = req.headers['x-access-token'];
            try {
                const decoded = jwt.verify(umtoken, 'secret123');
                const id = decoded;
                await User.updateOne(
                    { id },
                    {
                        $set: {
                            alias: req.body.alias,
                            name: req.body.name,
                            surname: req.body.surname,
                            email: req.body.email,
                            phone: req.body.phone,
                            address: {
                                country: req.body.address.country,
                                city: req.body.address.city,
                                street: req.body.address.street,
                                zipCode: req.body.address.zipCode,
                            },
                        },
                    }
                );

                return res.json({ status: 'ok', message: 'User Info Updated' });
            } catch (err) {
                // console.log(err);
                return res.json({ status: 'error', message: 'Invalid Update' });
            }
        });

        // update password route api
        //
        app.post('/updatePassword', async (req, res) => {
            const umtoken = req.headers['x-access-token'];
            try {
                const decoded = jwt.verify(umtoken, 'secret123');
                const id = decoded;
                const UpdatedPassword = await bcrypt.hash(req.body.password, 10);

                await User.updateOne(
                    { id },
                    {
                        $set: {
                            password: UpdatedPassword,
                        },
                    }
                );
                console.log('RES', UpdatedPassword);
                return res.json({ status: 'ok', userToken: res });
            } catch (err) {
                // console.error(err);
                return res.json({ status: 'error', message: err });
            }
        });

        // add Admin route mongoose
        //
        app.post('/addAdmin', async (req, res) => {
            console.log(req.body);
            try {
                await Admin.create({
                    adminEmail: req.body.adminEmail,
                    user: req.body.user,
                });

                return res.json({
                    status: 'ok',
                    message: 'Admin Added Successfully',
                });
            } catch (err) {
                console.error(err);
                return res.json({ status: 'error', message: err });
            }
        });

        // get/ check admin route mongoose
        //
        app.post('/isAdmin', async (req, res) => {
            try {
                const findAdmin = await Admin.findOne({ adminEmail: req.body.email });
                if (!findAdmin) {
                    return res.json({ status: 'error', message: 'Admin not Fount' });
                }
                return res.json({ status: 'ok', message: 'Admin found' });
            } catch {
                return res.json({ status: 'error', message: 'Error! Admin not found' });
            }
        });
    } finally {
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}/`);
        });
    }
}

run().catch(console.dir);
