function catContents(id) {
  return `SELECT * FROM Categories WHERE id=${id};`;
}

function childThings(id) {
  // note, because all categories need a category id, teh root category ahs the category id of 1, but we never want to include it in the results returned
  return `SELECT things.* FROM Things JOIN ThingCategories ON things.id = ThingCategories.thing_id WHERE ThingCategories.category_id = ${id};`;
}

function childCats(id) {
  return `SELECT * FROM Categories WHERE category_id = ${id} AND NOT id = 1;`;
}

function thingComments(id) {
  return `SELECT comments.id AS comment_id, comments.*, users.* FROM thingcomments JOIN comments ON comments.id = thingComments.id JOIN users ON users.id = comments.user_id WHERE thing_id = ${id}`
}

function similarThings(id) {
  return `SELECT t3.name, t3.id FROM things AS t1 JOIN SimilarThings AS t2 ON t1.id = t2.thing_id JOIN things AS t3 ON t3.id = t2.similar_id WHERE t1.id = ${id};`;
}

function comments(id) {
  return `SELECT * FROM Comments WHERE comment_id = ${id};`;
}

module.exports = {
  catContents: catContents,
  childThings: childThings,
  childCats: childCats,
  comments: comments,
  thingComments: thingComments,
  similarThings: similarThings
}
