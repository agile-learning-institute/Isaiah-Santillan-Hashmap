#  JavaScript HashMap & HashSet Implementation

A custom-built implementation of `HashMap` and `HashSet` in JavaScript with collision handling, dynamic resizing, and a web UI for easy interaction and testing.

##  Overview

This project replicates core behaviors of hash-based data structures, demonstrating how keys are hashed, collisions are managed, and capacity is scaled. A simple and interactive UI is included to manipulate and test the data structures in real time.

##  Features

###  HashMap
- `set(key, value)`: Assigns a value to a string key.
- `get(key)`: Retrieves the value for a key.
- `has(key)`: Checks if a key exists.
- `remove(key)`: Removes a key-value pair.
- `length()`: Returns the number of stored keys.
- `clear()`: Removes all entries.
- `keys()`: Returns all keys.
- `values()`: Returns all values.
- `entries()`: Returns all key-value pairs.
- **Collision Handling**: Uses separate chaining.
- **Dynamic Resizing**: Doubles bucket size once the load factor (default: `0.75`) is exceeded.
- **Bounds Checking**: Prevents illegal access to bucket indices.

###  HashSet
- Stores only keys, with no associated values.
- Methods: `add`, `has`, `remove`, `clear`, `keys`, `length`.
