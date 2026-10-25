import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const Category = sequelize.define("Category",{
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: false,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
        type: DataTypes.STRING(500),
    },
    description: {
        type: DataTypes.TEXT("long")
    },
    status: {
        type: DataTypes.STRING(20)
    },
    position: {
        type: DataTypes.INTEGER
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false
    },
    deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    deletedAt: {
        type: DataTypes.DATE
    },
    
}, {
  tableName: "categories",
  timestamps: true, //Tự động qly CreateAt vá UpdateAt
});

export default Category;