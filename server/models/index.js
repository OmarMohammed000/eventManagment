import { Sequelize } from "sequelize";
import DBConfig from "../utils/DBConfig";
import User from "./UserModel";
import Tag from "./TagModel";
import Event from "./EventModel";
import EventTag from "./EventTagModel";
import EventImage from "./EventImageModel";
import UserEvent from "./UserEventsModel";

const sequelize = new Sequelize(
  DBConfig.development.database,
  DBConfig.development.username,
  DBConfig.development.password,
  {
    host: DBConfig.development.host,
    dialect: "postgres",
  }
);

const db={};

db.Sequelize = Sequelize;
db.sequelize = sequelize; 

db.User = User(sequelize, Sequelize);
db.Tag = Tag(sequelize, Sequelize); 
db.Event = Event(sequelize, Sequelize);
db.EventTag = EventTag(sequelize, Sequelize);
db.EventImage = EventImage(sequelize, Sequelize);
db.UserEvent = UserEvent(sequelize, Sequelize);
// Associations
db.Event.belongsToMany(db.Tag, {
  through: db.EventTag,
  foreignKey: "eventId",
  as: "tags",
});
db.Tag.belongsToMany(db.Event, {
  through: db.EventTag,
  foreignKey: "tagId",
  as: "events",
});
db.Event.hasMany(db.EventImage, {
  foreignKey: "eventId",
  as: "event_images",
});
db.EventImage.belongsTo(db.Event, {
  foreignKey: "eventId",
  as: "event",
});
db.User.belongsToMany(db.Event, {
  through: db.UserEvent,
  foreignKey: "userId",
});
db.Event.belongsToMany(db.User, {
  through: db.UserEvent,
  foreignKey: "eventId",
});

export default db;
