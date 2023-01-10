const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Sphere extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Resume, { foreignKey: 'sphereId' });
      this.hasMany(models.Vacancy, { foreignKey: 'sphereId' });
    }
  }
  Sphere.init({
    title: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Sphere',
  });
  return Sphere;
};
