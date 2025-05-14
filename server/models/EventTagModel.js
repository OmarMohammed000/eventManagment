import { DataTypes } from "sequelize";

const EventTag = (sequelize) => {
  return sequelize.define(
    "EventTag",{
      tag_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "Tag",
          key: "id",
        },
      },
      event_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        references:{
          model:"Event",
          key:"id",
        }
      }
    },{
      tableName:"event_tags",
      timestamps:false,
    }
  )
}
export default EventTag;