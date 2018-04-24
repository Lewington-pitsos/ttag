function catContents(id) {
  return `SELECT * FROM Categories WHERE id=${id};`;
}

function childThings(id) {
  // note, because all categories need a category id, teh root category ahs the category id of 1, but we never want to include it in the results returned
  return `SELECT * FROM Things WHERE category_id = ${id};`;
}

function childCats(id) {
  return `SELECT * FROM Categories WHERE category_id = ${id} AND NOT id = 1;`;
}

function comments(id) {
  return `SELECT * FROM Comments WHERE comment_id = ${id};`;
}

module.exports = {
  catContents: catContents,
  childThings: childThings,
  childCats: childCats,
  comments: comments
}
