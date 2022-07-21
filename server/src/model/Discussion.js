import { DataTypes, Model } from "sequelize";
import { sequelize } from "../service/Database/SequelizeFactory.js"

class Discussion extends Model {}

Discussion.init({
    id:  {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true
    },
    label: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    themes: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue: []
    },
    users: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue: [],
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
    modelName: "discussion",
})

Discussion.addHook("beforeUpdate", async (discussion, { fields }) => {
    discussion.updatedAt = new Date();
});

export default Discussion;
