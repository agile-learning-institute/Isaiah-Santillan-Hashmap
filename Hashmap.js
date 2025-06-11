class HashMap {
  constructor(initialCapacity = 16, loadFactor = 0.75) {
    this.capacity = initialCapacity;
    this.loadFactor = loadFactor;
    this.buckets = Array.from({ length: this.capacity }, () => []);
    this.size = 0;
  }

  hash(key) {
    let hashCode = 0;
    const prime = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (prime * hashCode + key.charCodeAt(i)) % this.capacity;
    }
    return hashCode;
  }

  _getBucket(index) {
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    return this.buckets[index];
  }

  set(key, value) {
    const index = this.hash(key);
    const bucket = this._getBucket(index);

    for (let item of bucket) {
      if (item.key === key) {
        item.value = value;
        return;
      }
    }

    bucket.push({ key, value });
    this.size++;

    if (this.size / this.capacity >= this.loadFactor) {
      this._resize();
    }
  }

  get(key) {
    const index = this.hash(key);
    const bucket = this._getBucket(index);

    for (let item of bucket) {
      if (item.key === key) return item.value;
    }
    return null;
  }

  has(key) {
    const index = this.hash(key);
    const bucket = this._getBucket(index);

    return bucket.some(item => item.key === key);
  }

  remove(key) {
    const index = this.hash(key);
    const bucket = this._getBucket(index);

    const i = bucket.findIndex(item => item.key === key);
    if (i !== -1) {
      bucket.splice(i, 1);
      this.size--;
      return true;
    }
    return false;
  }

  length() {
    return this.size;
  }

  clear() {
    this.buckets = Array.from({ length: this.capacity }, () => []);
    this.size = 0;
  }

  keys() {
    const result = [];
    for (let bucket of this.buckets) {
      for (let item of bucket) {
        result.push(item.key);
      }
    }
    return result;
  }

  values() {
    const result = [];
    for (let bucket of this.buckets) {
      for (let item of bucket) {
        result.push(item.value);
      }
    }
    return result;
  }

  entries() {
    const result = [];
    for (let bucket of this.buckets) {
      for (let item of bucket) {
        result.push([item.key, item.value]);
      }
    }
    return result;
  }

  _resize() {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.buckets = Array.from({ length: this.capacity }, () => []);
    this.size = 0;

    for (let bucket of oldBuckets) {
      for (let item of bucket) {
        this.set(item.key, item.value);
      }
    }
  }
}

// Testing HashMap

const test = new HashMap(16, 0.75);

test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');

// Overwrite test
test.set('apple', 'green');
test.set('banana', 'brown');

// Make it resize
test.set('moon', 'silver');

console.log("Length:", test.length());
console.log("Get 'moon':", test.get('moon'));
console.log("Has 'dog':", test.has('dog'));
console.log("Remove 'dog':", test.remove('dog'));
console.log("Has 'dog' after removal:", test.has('dog'));
console.log("Keys:", test.keys());
console.log("Values:", test.values());
console.log("Entries:", test.entries());
test.clear();
console.log("After clear, length:", test.length());
