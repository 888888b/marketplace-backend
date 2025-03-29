import sequelize from "@/config/sequelize";
import DataTypes from "sequelize";

const User = sequelize.define( "User", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    profilePhoto: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    modelName: 'user',
    tableName: 'users',
    timestamps: true
});

export default User;
