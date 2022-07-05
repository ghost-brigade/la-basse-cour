import { DataTypes, Model } from "sequelize";
import { sequelize } from "../service/Database/SequelizeFactory.js"
import bcryptjs from "bcryptjs";

class User extends Model {}

User.init({
    id:  {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            len: {
                min: 6,
                max: 255,
            },
        }
    },
    roles: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue: ["user"],
        validate: {
            isIn: {
                args: [["user", "admin"]],
                msg: "Invalid role",
            },
        }
    },
    firstname: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            len: {
                min: 2,
            },
        },
    },
    lastname: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            len: {
                min: 2,
            },
        },
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
    modelName: "user"
})

User.addHook("beforeCreate", async (user) => {
    let PasswordGenerator = import("../service/Security/PasswordGenerator.js");
    user.password = (await PasswordGenerator).generate(user.password);
});

User.addHook("beforeUpdate", async (user, { fields }) => {
    user.updatedAt = new Date();

    if (fields.includes("password")) {
        let PasswordGenerator = import("../service/Security/PasswordGenerator.js");
        user.password = (await PasswordGenerator).generate(user.password);
    }
});

export default User;
