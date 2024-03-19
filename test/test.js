import { Nio } from 'niodb';
const db = await new Nio('example_data.json');
db.name = 'Niodb';
db.message = 'Hello Niodb!';
db.users = [
    {
        name: 'Bill',
        age: 19
    }
]
db.users[0].age++;


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


// const db = await new Nio('./test.json');


// console.log(db)



