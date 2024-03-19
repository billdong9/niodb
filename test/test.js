import { Nio, DatabaseError } from './../src/main.js';

const db1 = await new Nio('./test.json');
db1.$set('a', {
    ab: {
        ba: 1,
        ac: {
            q: 0
        }
    }
})
console.log(db1.$rename('a', 'info').$get('info'))




