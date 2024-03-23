import { Nio } from 'niodb' // OR const { Nio } = require('niodb')
const db = await new Nio('example_data.json')
db.name = 'NioDB'
db.message = 'Hello NioDB!'
db.users = {
  count: 100
}
db.users.count++
