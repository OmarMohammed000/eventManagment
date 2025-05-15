import { Sequelize } from "sequelize";
import DBConfig from "../utils/DBConfig.js";
import User from "./UserModel.js";
import Tag from "./TagModel.js";
import Event from "./EventModel.js";
import EventTag from "./EventTagModel.js";
import EventImage from "./EventImagesModel.js";
import UserEvent from "./UserEventsModel.js";

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
db.UserEvents = UserEvent(sequelize, Sequelize);
// Associations
db.Event.belongsToMany(db.Tag, {
  through: 'event_tags', // Match your PostgreSQL table name
  foreignKey: 'event_id', // Match your column name
  otherKey: 'tag_id', // Match your column name
  as: 'tags'
});

db.Tag.belongsToMany(db.Event, {
  through: 'event_tags',
  foreignKey: 'tag_id',
  otherKey: 'event_id',
  as: 'events'
});

db.Event.hasMany(db.EventImage, {
  foreignKey: 'event_id',
  as: 'event_images',
  onDelete: 'CASCADE'
});

db.EventImage.belongsTo(db.Event, {
  foreignKey: 'event_id',
  targetKey: 'id',
  as: 'event'
});
db.User.belongsToMany(db.Event, {
  through: 'user_events', // Match your PostgreSQL table name
  foreignKey: 'user_id', // Match your column name
  otherKey: 'event_id'
});

db.Event.belongsToMany(db.User, {
  through: 'user_events',
  foreignKey: 'event_id',
  otherKey: 'user_id'
});


export default db;
