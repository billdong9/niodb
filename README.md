# Niodb
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
```

The `example_data.json` file after running this code is going to be:

```json
{
    "name": "NioDB",
    "message": "Hello NioDB!",
    "users": [
        {
            "name": "Bill",
            "age": 19
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

`new Nio(filepath)` when `filepath` is a string, returning a Promise object that will return a Nio instance, so you have to use `await` keyword to get the instance.

If `filepath` is not defined, it will directly return a Nio instance, no `await` is needed. But for consistency, we recommend you to always use `await` when initializing the database.

### Setting and Getting data
Set a key in the database to hold a value is very simple, just like assigning a value to a JavaScript object:

```javascript
database.key = value;
```

Then the change of the data will be reflected to the .json file automatically.

And getting the value of a key is also that simple:

```javascript
value = database.key;
```

Or, you may use wrapper methods `$set` and `$get` to do the same thing:

```javascript
// setting the value to the key
database.$set(key, value);

// getting the value of the key
value = database.$get(key);
```

The choice is up to you.