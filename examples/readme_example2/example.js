import { Nio } from 'niodb'

const db = await new Nio()
db.content = {
  content1: 'hello',
  content2: 'this is NioDB',
  content3: 'you will like it'
}
db.content.$delete('content1').$rename('content2', 'introduction').$set('content3', true)

console.log(db)
