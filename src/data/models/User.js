import Sequelize from "sequelize";
import db from "../database";

export default db.define("User", {

}, {
	timestamps: true
});
