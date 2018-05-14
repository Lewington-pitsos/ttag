
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
      name: 'The Color of Magic',
      text: 'great book',
      image: 'black_adder.jpg'
    },
    {
      id: 1002,
      name: 'Odysseus',
      text: 'great book',
      image: 'black_adder.jpg'
    },
    {
      id: 1003,
      name: 'Tomorrow when the war began',
      text: 'great book',
      image: 'black_adder.jpg'
    },
    {
      id: 1004,
      name: 'The Name of the Wind',
      text: 'terrible book',
      image: 'black_adder.jpg',
      good: false
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
  ],
  'Users': [
    {
      id: 1000,
      username: 'benny76',
      password: '32435423',
      email: 'bennny@goo.com'
    },
    {
      id: 1001,
      username: 'galfo',
      password: '32435dada3',
      email: 'galfoil@hotmail.com'
    }
  ],
  'Comments' : [
    {
      id: 1000,
      user_id: 1000,
      text: 'sdasdfasduahsduasjdasdhajsd ad ias dihahs dsihasd ash d'
    },
    {
      id: 1001,
      user_id: 1001,
      text: 'sdasdfasduahsduasjdasdhajsd ad ias dihahs dsihasd ash d'
    },
    {
      id: 1002,
      user_id: 1001,
      text: 'sdasdfasduahsduasjdasdhajsd ad ias dihahs dsihasd ash d'
    },
    {
      id: 1003,
      user_id: 1001,
      text: 'sdasdfasduahsduasjdasdhajsd ad ias dihahs dsihasd ash d'
    },
    {
      id: 1004,
      user_id: 1000,
      text: 'sdasdfasduahsduasjdasdhajsd ad ias dihahs dsihasd ash d'
    }
  ],
  'ThingComments': [
    {
      id: 1000,
      thing_id: 1000,
      comment_id: 1000
    },
    {
      id: 1001,
      thing_id: 1000,
      comment_id: 1001
    },
    {
      id: 1002,
      thing_id: 1000,
      comment_id: 1002
    },
    {
      id: 1003,
      thing_id: 1000,
      comment_id: 1003
    },
    {
      id: 1004,
      thing_id: 1000,
      comment_id: 1004
    }
  ],
  'SimilarThings': [
    {
      id: 1000,
      thing_id: 1000,
      similar_id: 1001
    },
    {
      id: 1001,
      thing_id: 1000,
      similar_id: 1004
    }
  ]
}

function setApproval(id, approval) {
  return `UPDATE things SET approval = ${approval} WHERE id = ${id};`;
}


module.exports = {
  testData: testData,
  setApproval: setApproval
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
