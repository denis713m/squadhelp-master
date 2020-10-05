

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'anon.png',
    },
    role: {
      type: DataTypes.ENUM('customer', 'creator'),
      allowNull: false,
    },
    balance: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    accessToken: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    refreshToken: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    timestamps: false,
  });


  User.associate = function (models) {
    User.hasMany(models.Offers, { foreignKey: 'user_id', targetKey: 'id' });
  };
  User.associate = function (models) {
    User.hasMany(models.Events, { foreignKey: 'user_id', targetKey: 'id' });
  };

  User.associate = function (models) {
    User.hasMany(models.TransactionHistory,
        { foreignKey: 'user_id', targetKey: 'id' });
  };
  User.associate = function (models) {
    User.hasMany(models.Conversations, { foreignKey: 'participant1', targetKey: 'id' });
  };
  User.associate = function (models) {
    User.hasMany(models.Conversations, { foreignKey: 'participant2', targetKey: 'id' });
  };
  User.associate = function (models) {
    User.hasMany(models.Messages, { foreignKey: 'sender', targetKey: 'id' });
  };
  return User;
};
