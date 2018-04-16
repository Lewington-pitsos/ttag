function catContents(id) {
  return `SELECT * FROM Categories WHERE id=${id};`;
}

function childThings(id) {
  return `SELECT * FROM Things WHERE category_id = ${id};`;
}

function childCats(id) {
  return `SELECT * FROM Categories WHERE category_id = ${id};`;
}

function comments(id) {
  return `SELECT * FROM Comments WHERE comment_id = ${id};`;
}

module.exports = {
  catContents: catContents
}
