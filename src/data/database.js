import Sequelize from "sequelize";

//TODO: change database configuration and set up migrations folder
export default new Sequelize(null, null, null, {
	dialect: "sqlite",
	storage: ":memory:"
});
