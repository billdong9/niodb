# Niodb
#### Quick Example
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
    "name": "Niodb",
    "message": "Hello Niodb!",
    "users": [
        {
            "name": "Bill",
            "age": 19
        }
    ]
}
```

### Getting Started
#### Installation
1. Run `npm i niodb --save` to install Niodb on your local machine.
2. Import niodb `import { Nio } from 'niodb';`
