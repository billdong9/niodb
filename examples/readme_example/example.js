import { Nio } from 'niodb'
const db = await new Nio('example_data.json')
db.name = 'Niodb'
db.message = 'Hello Niodb!'
db.users = [
  {
    name: 'Bill',
    age: 19
  }
]
db.users[0].age++
