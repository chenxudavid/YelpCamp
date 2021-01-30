const express = require('express');
const userRouter = express.Router();
const users = require('../controllers/users');
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');

userRouter.route('/register')
    .get(users.renderRegisterForm)
    .post(catchAsync(users.createUser));


userRouter.route('/login')
    .get(users.renderLoginForm)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.loginUser);

userRouter.get('/logout', users.logoutUser);

module.exports = userRouter;
