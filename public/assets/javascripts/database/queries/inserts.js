function insertTo(relation, inserts) {
  var names = [];
  var values = [];
  Object.keys(inserts).forEach(function(key, _) {
    names.push(key);
    values.push("'" + inserts[key] + "' ");
  })
  names = names.join(', ');
  return `INSERT INTO ${relation} (${names}) VALUES(${values});`
}

module.exports = {
  insertTo: insertTo
}

/*
console.log(insertTo('Categories', {
  name: 'Books',
  intro: 'You read them...',
  image: 'books.jpg',
  category_id: 1
}));
*/
