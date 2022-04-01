/**
 * @file Implements the data schema of User
 */
import mongoose from "mongoose";


/**
 * @typedef User represents the data schema of users
 * @property {string} username represents the username of a user
 * @property {string} password represents the password of the user's account
 * @property {string} firstname represents the firstname of a user
 * @property {string} lastname represents the lastname of a user
 * @property {string} email represents the email address of a user
 * @property {string} profilePhoto represents the profile photo link
 * @property {string} headerImage represents the header image link
 * @property {AccountType} accountType represents the account type of the user's account
 * @property {MaritalStatus} maritalStatus represents the user's marital status
 * @property {string} biography represents the user's biography
 * @property {string} dateOfBirth represents the user's date of birth
 * @property {Date} joined represents the date when the user joined Tuiter
 * @property {Location} location represents the user's location
 */
const UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    firstName: String,
    lastName: String,
    email: String,
    profilePhoto: String,
    headerImage: String,
    accountType: {type: String, default: 'PERSONAL', enum:['PERSONAL', 'ACADEMIC', 'PROFESSIONAL']},
    maritalStatus: {type: String, default: 'SINGLE', enum:['MARRIED', 'SINGLE', 'WIDOWED']},
    biography: String,
    dateOfBirth: Date,
    joined: {type: Date, default: Date.now},
    location: {
        latitude: Number,
        longitude: Number
    },
}, {collection: 'users'});

export default UserSchema;
