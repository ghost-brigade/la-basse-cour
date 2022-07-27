import { DataTypes, Model } from "sequelize";
import { sequelize } from "../service/Database/SequelizeFactory.js"

class Report extends Model {}

Report.init({
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
    reason: {
        type: DataTypes.ENUM,
        values: ["harassment", "fake_profile", "others"],
        defaultValue: "others"
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    resolved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
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
    modelName: "report",
})

Report.addHook("beforeUpdate", async (report, { fields }) => {
    report.updatedAt = new Date();
});

export default Report;
