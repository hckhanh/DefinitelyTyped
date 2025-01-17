import LRUCache = require('lru-cache');

const num = 1;

interface Foo {
    foo(): void;
}

const foo = {
    foo() {}
};

const cache = new LRUCache<string, Foo>({ max: num });
cache; // $ExpectType LRUCache<string, Foo>
new LRUCache<string, Foo>({ // $ExpectType LRUCache<string, Foo>
    max: num,
    ttl: num,
    length(value) {
        value; // $ExpectType Foo
        return num;
    },
    dispose(key, value) {
        key; // $ExpectType string
        value; // $ExpectType Foo
    },
    stale: false,
    noDisposeOnSet: false,
});
new LRUCache<string, Foo>({ // $ExpectType LRUCache<string, Foo>
    max: num,
    ttl: num,
    length: (value) => {
        return num;
    },
    dispose: (key, value) => {},
    stale: false,
    noDisposeOnSet: false,
});

cache.sizeCalculation; // $ExpectType number
cache.sizeCalculation = 1; // $ExpectError

cache.size; // $ExpectType number
cache.size = 1; // $ExpectError

cache.allowStale; // $ExpectType boolean
cache.allowStale = true;

cache.max; // $ExpectType number
cache.max = 1;

cache.ttl; // $ExpectType number
cache.ttl = 1;

cache.set('foo', foo); // $ExpectType boolean
cache.set(1, foo); // $ExpectError
cache.set('foo', 1); // $ExpectError

cache.get('foo'); // $ExpectType Foo | undefined
cache.get(1); // $ExpectError

cache.peek('foo'); // $ExpectType Foo | undefined
cache.peek(1); // $ExpectError

cache.has('foo'); // $ExpectType boolean
cache.has(1); // $ExpectError

cache.delete('foo');
cache.delete(1); // $ExpectError

cache.clear();
cache.purgeStale();

cache.forEach(function(value, key, cache) {
    value; // $ExpectType Foo
    key; // $ExpectType string
    cache; // $ExpectType LRUCache<string, Foo>
    this; // $ExpectType LRUCache<string, Foo>
});
cache.forEach(function(value, key, cache) {
    value; // $ExpectType Foo
    key; // $ExpectType string
    cache; // $ExpectType LRUCache<string, Foo>
    this; // $ExpectType { foo(): void; }
}, foo);

cache.rforEach(function(value, key, cache) {
    value; // $ExpectType Foo
    key; // $ExpectType string
    cache; // $ExpectType LRUCache<string, Foo>
    this; // $ExpectType LRUCache<string, Foo>
});
cache.rforEach(function(value, key, cache) {
    value; // $ExpectType Foo
    key; // $ExpectType string
    cache; // $ExpectType LRUCache<string, Foo>
    this; // $ExpectType { foo(): void; }
}, foo);

cache.keys(); // $ExpectType string[]
cache.values(); // $ExpectType Foo[]

const dump = cache.dump();
dump; // $ExpectType Entry<string, Foo>[]
cache.load(dump);
