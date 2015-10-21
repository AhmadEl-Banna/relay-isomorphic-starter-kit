import Sequelize from "sequelize";

export default new Sequelize(null, null, null, {
	dialect: "sqlite",
	storage: ":memory:"
});
