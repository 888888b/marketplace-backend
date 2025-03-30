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
    password: {
        type: DataTypes.STRING,
    },
    picture: {
        type: DataTypes.STRING,
    },
    phone: {
        type: DataTypes.STRING
    },
    googleId: {
        type: DataTypes.STRING
    },
    verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    modelName: 'user',
    tableName: 'users',
    timestamps: true
});

export default User;
