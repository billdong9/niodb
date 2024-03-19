import { Nio, DatabaseError } from './../src/main.js';

// const db1 = await new Nio('./test.json');
// db1.$set('a', {
//     ab: {
//         ba: 1,
//         ac: {
//             q: 0
//         }
//     }
// })
// db1.b = 2;
// console.log(db1.a.ab.$set('c', 2));
// console.log(db1);


const db = await new Nio('./test.json');


console.log(db)



