import sequelize from "@/config/sequelize";
import DataTypes from "sequelize";

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: DataTypes.TEXT,
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    storeId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
}, {
    modelName: 'product',
    tableName: 'products',
    timestamps: true
})

export default Product
