class HashSet {
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

  add(key) {
    const index = this.hash(key);
    const bucket = this._getBucket(index);

    if (!bucket.includes(key)) {
      bucket.push(key);
      this.size++;

      if (this.size / this.capacity >= this.loadFactor) {
        this._resize();
      }
    }
  }

  has(key) {
    const index = this.hash(key);
    const bucket = this._getBucket(index);

    return bucket.includes(key);
  }

  remove(key) {
    const index = this.hash(key);
    const bucket = this._getBucket(index);

    const idx = bucket.indexOf(key);
    if (idx !== -1) {
      bucket.splice(idx, 1);
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
      for (let key of bucket) {
        result.push(key);
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
      for (let key of bucket) {
        this.add(key);
      }
    }
  }
}

// Testing Hashset

const mySet = new HashSet();

mySet.add("apple");
mySet.add("banana");
mySet.add("carrot");
mySet.add("apple"); 

console.log("Has 'banana'? →", mySet.has("banana")); // should be true
console.log("Has 'dog'? →", mySet.has("dog")); // should be false
console.log("Remove 'banana' →", mySet.remove("banana")); // should be true
console.log("Remove 'banana' again →", mySet.remove("banana")); // should be false
console.log("Keys →", mySet.keys());
console.log("Size →", mySet.length());
mySet.clear();
console.log("Size after clear →", mySet.length());
