/**
 * @file Declares Tuit object data model
 */
import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";
import Location from "./Location";

/**
 * @typedef User represents a user on Tuiter
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
export default class User {
    private username: string = '';
    private password: string = '';
    private firstname: string | null = null;
    private lastname: string | null = null;
    private email: string = '';
    private profilePhoto: string | null = null;
    private headerImage: string | null = null;
    private accountType: AccountType = AccountType.Personal;
    private maritalStatus: MaritalStatus = MaritalStatus.Single;
    private biography: string | null = null;
    private dateOfBirth: string | null = null;
    private joined: Date = new Date();
    private location: Location | null = null;
}
