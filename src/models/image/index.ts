// models/ProductImage.ts
import { DataTypes } from 'sequelize'
import sequelize from '@/config/sequelize'

const ProductImage = sequelize.define('ProductImage', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    productId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
}, {
    modelName: 'product_image',
    tableName: 'product_images',
    timestamps: true,
})

export default ProductImage
