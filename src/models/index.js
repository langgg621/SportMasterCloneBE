const { User, BonusPoint } = require('./User');
const {
  Product, ProductSize, ProductColor,
  ProductTechnology, ProductCharacteristic,
  ProductSection, ProductCollection,
} = require('./Product');
const { Order, OrderItem, DeliveryOption, PickupPoint } = require('./Order');
const { CartItem } = require('./Cart');
const { ProductReview } = require('./Review');
const {
  Category, Brand, Color, Collection,
  CatalogSection, Banner, DailyDeal,
} = require('./Catalog');
const { ChatMessage } = require('./Chat');
const { ProfileMenuItem, AppSetting } = require('./Misc');

module.exports = {
  // User
  User, BonusPoint,
  // Product
  Product, ProductSize, ProductColor,
  ProductTechnology, ProductCharacteristic,
  ProductSection, ProductCollection,
  // Order
  Order, OrderItem, DeliveryOption, PickupPoint,
  // Cart
  CartItem,
  // Review
  ProductReview,
  // Catalog
  Category, Brand, Color, Collection,
  CatalogSection, Banner, DailyDeal,
  // Chat
  ChatMessage,
  // Misc
  ProfileMenuItem, AppSetting,
};