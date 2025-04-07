import sequelize from "@/config/sequelize";
import DataTypes from "sequelize";

const Store = sequelize.define('Store', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    logoUrl: {
        type: DataTypes.STRING,
    },
    bannerUrl: {
        type: DataTypes.STRING
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
}, {
    modelName: 'store',
    tableName: 'stores',
    timestamps: true
})

export default Store