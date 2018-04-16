const SCategories = `CREATE TABLE Categories (
  id serial,
  name VARCHAR(100) NOT NULL,
  image VARCHAR(100),
  intro VARCHAR(1000),
  category_id INTEGER REFERENCES Categories(id) ON DELETE CASCADE DEFAULT 1,
  CONSTRAINT unique_name UNIQUE(name),
  thing_category BOOLEAN NOT NULL DEFAULT FALSE,
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
  user_username VARCHAR(30) REFERENCES Users(username) ON DELETE CASCADE,
  PRIMARY KEY(id)
);`;

const DThingComments = 'DROP TABLE ThingComments;';

const SUsers = `CREATE TABLE Users (
  username VARCHAR(30) NOT NULL,
  password VARCHAR(30),
  image VARCHAR(100),
  email VARCHAR(40),
  CONSTRAINT unique_username UNIQUE(username),
  PRIMARY KEY(username)
);`;

const DUsers = 'DROP TABLE Users;';

const SAddRoot = `INSERT INTO Categories (name) VALUES ('Things that are Good');`;

const SAddAnon = `INSERT INTO users (username, password) VALUES ('anon', 'anon123');`;

module.exports = {
  drop: [
    DThingComments,
    DComments,
    DUsers,
    DSimilarThings,
    DThings,
    DCategories
  ],
  setup: [
    SCategories,
    SThings,
    SSimilarThings,
    SUsers,
    SComments,
    SThingComments,

    SAddRoot,
    SAddAnon
  ],
  relationNames: [
    'Categories',
    'Things',
    'SimilarThings',
    'Comments',
    'ThingComments',
    'Users',
  ]
}
