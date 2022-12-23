const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Resume extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Sphere, { foreignKey: 'sphereId' });
      this.belongsTo(models.Category, { foreignKey: 'categoryId' });
    }
  }
  Resume.init({
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.INTEGER,
    location: DataTypes.STRING,
    about: DataTypes.STRING,
    photo: DataTypes.STRING,
    salary: DataTypes.INTEGER,
    sphereId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Resume',
  });
  return Resume;
};
