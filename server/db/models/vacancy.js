const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Vacancy extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Response, { foreignKey: 'vacancyId' });
      this.hasMany(models.Favorite, { foreignKey: 'vacancyId' });
      this.belongsTo(models.User, { foreignKey: 'userId' });
      this.belongsTo(models.Sphere, { foreignKey: 'sphereId' });
      this.belongsTo(models.Category, { foreignKey: 'categoryId' });
    }
  }
  Vacancy.init({
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    company: DataTypes.STRING,
    city: DataTypes.STRING,
    sphereId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    salary: DataTypes.INTEGER,
    time: DataTypes.STRING,
    format: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Vacancy',
  });
  return Vacancy;
};
