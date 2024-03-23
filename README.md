# 🐬 Niodb
> Elegant & fast atomic local JSON database.

## Installation
```
$ npm i niodb --save
```

## Quick Example
The following code creates a Nio database on an empty .json file `example_data.json`, and adds some key-value pairs to it.

```javascript
import { Nio } from 'niodb' // OR const { Nio } = require('niodb')
const db = await new Nio('example_data.json')
db.name = 'NioDB'
db.message = 'Hello NioDB!'
db.users = {
  count: 100
}
db.users.count++
```

The `example_data.json` file after running this code is going to be:

```json
{
  "name": "NioDB",
  "message": "Hello NioDB!",
  "users": {
    "count": 101
  }
}
```

## Getting Started
### Set / Get the value of a key
Set a key in the database to hold a value is very simple, just like assigning a value to a JavaScript object:

```javascript
import { Nio } from 'niodb'
const db = await new Nio()

db.key = 'value'
```

The change of the data will be asynchronously and atomically stored on your disk if `filepath` is defined.

Getting the value of a key is also very simple:

```javascript
console.log(db.key)
```

🌟 Just treating Nio instances as ordinary JavaScript objects.

#### Wrapper methods
Or, you may use wrapper methods `$set` and `$get` to do the same thing:

```javascript
db.$set(key, value)
db.$get(key)
```

The choices are up to you.

### Delete / Check if a key exists
Just like how to delete and check a key in JavaScript objects:

```javascript
delete db.key
console.log(key in db)
```

#### Wrapper methods
The wrapper methods for deleting and checking if a key exists are:

```javascript
db.$delete(key)
db.$exists(key)
```

## API
### Nio
- `new Nio(filepath, config)`:

Every Nio instance refers to the database which is linking to a .json file:

```javascript
const database = await new Nio(filepath, config);
```

#### Filepath
If `filepath` is a string, `new Nio(filepath)` returns a Promise object that will return a Nio instance, so you have to use `await` keyword to get the instance.

If `filepath` is not defined, it will directly return a Nio instance, no `await` is needed. But for consistency, we recommend you to always use `await` when initializing the database.

#### Config
`config` is optional, it should be an object.

All options are:

```javascript
await new Nio(filepath, {
  // this method is called when the .json file on your disk has been updated
  transactionUpdated: () => {}
})
```

### Wrapper methods
All wrapper methods are:
- `$set(key, value)`: Set the value of a key. Setting the value to `undefined` will give you a `TypeError`.
- `$get(key)`: Get the value of a key.
- `$delete(key)`: Delete a key.
- `$exists(key)`: Returns if a key exists.
- `$randomKey()`: Return a random key.
- `$rename(key, newKey)`: Rename key to newKey, this will replace the new key if it already exists.
- `$type(key)`: Return the data type of the value stored in key. Possible return values are: `array`, `object`, `null`, `number`, `string`, `boolean`, and `undefined`.

#### Chaining
And sometimes you may want to chain together methods:

```javascript
const db = await new Nio()
db.content = {
  content1: 'hello',
  content2: 'this is NioDB',
  content3: 'you will like it'
}
db.content.$delete('content1').$rename('content2', 'introduction').$set('content3', true)

console.log(db)
```

You will get:

```javascript
{
  content: {
    content3: true,
    introduction: 'this is NioDB'
  }
}
```

### Error handling
```javascript
import { DatabaseError } from 'niodb'
```
