const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT || 'sqlite',
  storage: process.env.DB_DIALECT ? undefined : 'database.sqlite',
  url: process.env.DATABASE_URL || undefined,
  logging: false,
});

const Product = sequelize.define('Product', {
  name: { type: DataTypes.STRING, allowNull: false },
  description: DataTypes.TEXT,
  price: { type: DataTypes.INTEGER, allowNull: false }
});

const User = sequelize.define('User', {
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  passwordHash: DataTypes.STRING,
  name: DataTypes.STRING
});

const Order = sequelize.define('Order', {
  reference: { type: DataTypes.STRING, unique: true },
  amount: { type: DataTypes.INTEGER, allowNull: false },
  status: { type: DataTypes.ENUM('pending','paid','failed'), defaultValue: 'pending' },
  metadata: DataTypes.JSON
});

const OrderItem = sequelize.define('OrderItem', {
  quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
  unitPrice: { type: DataTypes.INTEGER, allowNull: false }
});

User.hasMany(Order);
Order.belongsTo(User);

Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

Product.hasMany(OrderItem);
OrderItem.belongsTo(Product);

async function initDb() {
  await sequelize.sync({ alter: true });
}

module.exports = { sequelize, Product, User, Order, OrderItem, initDb };
