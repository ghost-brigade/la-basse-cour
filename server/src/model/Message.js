import { DataTypes, Model } from "sequelize";
import { sequelize } from "../service/Database/SequelizeFactory.js"

class Message extends Model {}

//{'id': 21, 'discussion': 2, 'text': <img src={circle}/>, 'user': 3, 'date': new Date('2022-06-30 10:04')}
Message.init({
    id:  {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true
    },
    discussion: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    user: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    text: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: ''
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
    modelName: "message",
})

Message.addHook("beforeUpdate", async (discussion, { fields }) => {
    discussion.updatedAt = new Date();
});

export default Message;
