
const testData = {
  'Categories': [
    {
      id: 1000,
      name: 'Books',
      intro: 'You read them...',
      image: 'books.jpg',
      category_id: 1,
      thing_category: true
    },
    {
      id: 1001,
      name: 'Movies',
      intro: 'You read them...',
      image: 'books.jpg',
      category_id: 1
    },
    {
      id: 1002,
      name: 'Legal Cases',
      intro: 'You read them...',
      image: 'books.jpg',
      category_id: 1
    },
    {
      id: 1003,
      name: 'Short Films',
      intro: 'You read them...',
      image: 'books.jpg',
      category_id: 1
    },
    {
      id: 1004,
      name: 'Misc',
      intro: 'You read them...',
      image: 'books.jpg',
      category_id: 1
    },
    {
      id: 1005,
      name: 'Logic Puzzles',
      intro: 'You read them...',
      image: 'books.jpg',
      category_id: 1
    },
  ],
  'Things': [
    {
      id: 1000,
      name: 'Black Adder',
      text: 'great book',
      image: 'black_adder.jpg'
    },
    {
      id: 1001,
      name: 'Black Adder',
      text: 'great book',
      image: 'black_adder.jpg'
    },
    {
      id: 1002,
      name: 'Black Adder',
      text: 'great book',
      image: 'black_adder.jpg'
    },
    {
      id: 1003,
      name: 'Black Adder',
      text: 'great book',
      image: 'black_adder.jpg'
    },
  ],
  'ThingCategories' : [
    {
      category_id: 1000,
      thing_id: 1000
    },
    {
      category_id: 1000,
      thing_id: 1001
    },
    {
      category_id: 1000,
      thing_id: 1002
    },
    {
      category_id: 1000,
      thing_id: 1003
    }
  ]
}


module.exports = {
  testData: testData
}

/*
console.log(insertTo('Categories', {
  name: 'Books',
  intro: 'You read them...',
  image: 'books.jpg',
  category_id: 1
}));

console.log(insertTo('Things', {
  name: 'Black Adder',
  text: 'great book',
  image: 'black_adder.jpg',
  category_id: 1
}));

*/
