import { DataTypes, Model } from "sequelize";
import { sequelize } from "../service/Database/SequelizeFactory.js"

class Friend extends Model {}

Friend.init({
    id:  {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true
    },
    requesterId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    addresseeId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM,
        values: ["pending", "accepted", "rejected"],
        defaultValue: "pending"
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP")
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    sequelize,
    modelName: "friend",
})

Friend.addHook("beforeUpdate", async (friend, { fields }) => {
    friend.updatedAt = new Date();
});

export default Friend;
