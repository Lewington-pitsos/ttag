const SCategories = `CREATE TABLE Categories (
  id serial,
  name VARCHAR(100) NOT NULL,
  image VARCHAR(100),
  intro VARCHAR(1000),
  category_id INTEGER REFERENCES Categories(id) ON DELETE CASCADE DEFAULT 1,
  CONSTRAINT unique_name UNIQUE(name),
  PRIMARY KEY(id)
);`;

const DCategories = 'DROP TABLE Categories';

module.exports = {
  drop: [
    DCategories
  ],
  setup: [
    SCategories
  ]
}
