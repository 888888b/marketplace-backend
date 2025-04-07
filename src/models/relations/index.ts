import User from '../user'
import Store from '../store';
import Product from '../product';
import ProductImage from '../image';

// User - Store (1:N)
User.hasMany( Store, { 
    foreignKey: 'userId', 
    as: 'stores',
    onDelete: 'CASCADE'
});

Store.belongsTo( User, { 
    foreignKey: 'userId', 
    as: 'owner',
    onDelete: 'CASCADE'
});

// Store - Product (1:N)
Store.hasMany( Product, { 
    foreignKey: 'storeId', 
    as: 'products',
    onDelete: 'CASCADE'
});

Product.belongsTo( Store, { 
    foreignKey: 'storeId', 
    as: 'store',
    onDelete: 'CASCADE'
});

// Produto pode ter várias imagens
Product.hasMany( ProductImage, {
    foreignKey: 'productId',
    as: 'images',
    onDelete: 'CASCADE'
});

ProductImage.belongsTo( Product, {
    foreignKey: 'productId',
    as: 'product',
    onDelete: 'CASCADE'
});

export { User, Store, Product, ProductImage };