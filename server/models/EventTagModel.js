import { DataTypes } from "sequelize";

const EventTag = (sequelize) => {
  sequelize.define(
    "EventTag",{
      tagId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "Tag",
          key: "id",
        },
      },
      eventId:{
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