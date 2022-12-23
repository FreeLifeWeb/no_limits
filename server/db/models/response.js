const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Response extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Vacancy, { foreignKey: 'vacancyId' });
      this.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  Response.init({
    userId: DataTypes.INTEGER,
    vacancyId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Response',
  });
  return Response;
};
