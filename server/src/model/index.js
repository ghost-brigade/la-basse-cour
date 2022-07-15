/** Import the models */
import User from "./User.js";
import Friend from "./Friend.js";

export const init = () => { console.log("Initializing models"); }

User.hasMany(Friend, {as: "friends_requester", foreignKey: "requesterId", onDelete: "CASCADE"});
User.hasMany(Friend, {as: "friends_addressee", foreignKey: "addresseeId", onDelete: "CASCADE"});

Friend.belongsTo(User, {foreignKey: "requesterId", onDelete: "CASCADE"});
Friend.belongsTo(User, {foreignKey: "addresseeId", onDelete: "CASCADE"});

export { User, Friend };
