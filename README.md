# 🐬 Niodb
> Minimalist & fast atomic local JSON database.

### Quick Example
The following code creates a Nio database on an empty .json file `example_data.json`, and adds some key-value pairs to it.

```javascript
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
```

The `example_data.json` file after running this code is going to be:

```json
{
  "name": "Niodb",
  "message": "Hello Niodb!",
  "users": [
    {
      "name": "Bill",
      "age": 20
    }
  ]
}
```

## Getting Started
### Installation
1. Run `npm i niodb --save` to install NioDB on your local machine.
2. On your .js file, import NioDB `import { Nio } from 'niodb'`

### The Nio Instance
Every Nio instance refers to the database which is linking to a .json file:

```javascript
const database = await new Nio(filepath);
```

When `filepath` is a string, `new Nio(filepath)` returns a Promise object that will return a Nio instance, so you have to use `await` keyword to get the instance.

If `filepath` is not defined, it will directly return a Nio instance, no `await` is needed. But for consistency, we recommend you to always use `await` when initializing the database.

### Setting and Getting a key
Set a key in the database to hold a value is very simple, just like assigning a value to a JavaScript object:

```javascript
database.key = value;
```

The change of the data will be automatically and atomically stored on your disk if `filepath` is defined.

And getting the value of a key is also that simple:

```javascript
value = database.key;
```

Just treating Nio instances as ordinary JavaScript objects.

#### Wrapper methods
Or, you may use wrapper methods `$set` and `$get` to do the same thing:

```javascript
// set the value to the key
database.$set(key, value);

// get the value of the key
value = database.$get(key);
```

The choices are up to you.

### Deleting and Checking if a key exists
Just like how to delete a key in an orinary JavaScript object:

```javascript
delete database.key;
```

And you can use `in` keyword to check if a key exists in the database:

```javascript
isKeyExists = key in database;
```

#### Wrapper methods
The wrapper methods for deleting and checking if a key exists are:

```javascript
// delete the key
database.$delete(key);

// check if the key exists
isKeyExists = database.$exists(key);
```

### Other wrapper methods
- `$randomKey()`: Return a random key.
- `$rename(key, newKey)`: Rename key to newKey, this will replace the new key if it already exists.
- `$type(key)`: Return the data type of the value stored in key. Possible return values are: `array`, `object`, `null`, `number`, `string`, `boolean`, `undefined`.
