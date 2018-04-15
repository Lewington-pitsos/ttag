const SCategories = `CREATE TABLE Categories (
  id serial,
  name VARCHAR(100) NOT NULL,
  image VARCHAR(100),
  intro VARCHAR(1000),
  category_id INTEGER REFERENCES Categories(id) ON DELETE CASCADE DEFAULT 1,
  CONSTRAINT unique_name UNIQUE(name),
  PRIMARY KEY(id)
);`;

const DCategories = 'DROP TABLE Categories;';

const SThings = `CREATE TABLE Things (
  id serial,
  name VARCHAR(100) NOT NULL,
  image VARCHAR(100),
  text VARCHAR(1000),
  approval INTEGER NOT NULL DEFAULT 0,
  good BOOLEAN NOT NULL DEFAULT TRUE,
  category_id INTEGER REFERENCES Categories(id) ON DELETE CASCADE,
  PRIMARY KEY(id)
);`;

const DThings = 'DROP TABLE Things;';

const SSimilarThings = `CREATE TABLE SimilarThings (
  id serial,
  thing_id INTEGER REFERENCES Things(id) ON DELETE CASCADE,
  similar_id INTEGER REFERENCES Things(id) ON DELETE CASCADE,
  PRIMARY KEY(id)
);`;

const DSimilarThings = 'DROP TABLE SimilarThings;';


const SComments = `CREATE TABLE Comments (
  id serial,
  text VARCHAR(600),
  time TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY(id)
);`;

const DComments = 'DROP TABLE Comments;';

const SThingComments = `CREATE TABLE ThingComments (
  id serial,
  thing_id INTEGER REFERENCES Things(id) ON DELETE CASCADE,
  comment_id INTEGER REFERENCES Comments(id) ON DELETE CASCADE,
  PRIMARY KEY(id)
);`;

const DThingComments = 'DROP TABLE ThingComments;';

const SUsers = `CREATE TABLE Users (
  username VARCHAR(30),
  password VARCHAR(30),
  image VARCHAR(100),
  email VARCHAR(40),
  CONSTRAINT unique_username UNIQUE(username),
  PRIMARY KEY(username)
);`;

const DUsers = 'DROP TABLE Users;';


const SUserComments = `CREATE TABLE UserComments (
  id serial,
  user_username VARCHAR(30) REFERENCES Users(username) ON DELETE CASCADE,
  comment_id INTEGER REFERENCES Comments(id) ON DELETE CASCADE,
  PRIMARY KEY(id)
);`;

const DUserComments = 'DROP TABLE UserComments;';

module.exports = {
  drop: [
    DUserComments,
    DUsers,
    DThingComments,
    DComments,
    DSimilarThings,
    DThings,
    DCategories
  ],
  setup: [
    SCategories,
    SThings,
    SComments,
    SSimilarThings,
    SThingComments,
    SUsers,
    SUserComments
  ],
  relationNames: [
    'Categories',
    'Things',
    'SimilarThings',
    'Comments',
    'ThingComments',
    'Users',
    'UserComments'
  ]
}
