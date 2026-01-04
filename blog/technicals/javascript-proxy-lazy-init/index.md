---
title: Javascript Lazy Initialization using JS Proxy
date: "2021-03-12T00:00:00.000Z"
description: Flowtyping more with less
tags: Javascript, Proxy, JS, Lazy Initialization
draft: false
codeReadTimes: 8
---

[JS Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy). A mysterious object that seems to do _probably_ great things. Yet unsure of how its magic can be applied.

Whelp. If you've stumbled onto 'tis humble blog ole mine, then I hope ye in fer some treat.

Let's begin by defining a problem, and our goal.

## Problem

We have an object that is computationally heavy, imagine a server. However, we realize that in our some of our control statement, we may not need to create the server!

## Goal

The server shall be created/initialized early in the project.

```js
const server = new HeavyServer({
  arguments1: 1,
  arguments2: 2,
});
```

Then, in some of our control flow, we will not actually do anything with the server, while in some other control flow, we will do something.

```js
// somewhere deep in the callstack
if (someConfig) {
  server.doSomethingHeavily();
} else {
  // do nothing
}
```

Now as we may want to do such a thing like initializing just before we call it.

```js
// somewhere deep in the callstack
if (someConfig) {
  const server = new HeavyServer({
    arguments1: 1,
    arguments2: 2,
  });
  server.doSomething();
} else {
  // do nothing
}
```

It may not be a best choice as we are leaking the configuration of the server over to somewhere deep in the callstack.

So with that constraint, how can `Proxy` help us to achieve it?

### **Behold**

```js
class LazyInit {
  constructor(args) {
    this.server = null;
    this.initArgs = args;
  }

  get(target, prop, receiver) {
    if (!this.server) {
      this.server = new Server(this.initArgs);
    }
    return Reflect.get(this.server, prop);
  }
}

const server = new Proxy(
  Server,
  new LazyInit({
    arguments1: 1,
    arguments2: 2,
  })
);
```

# Explanation

## The `new Proxy`

```js{numberLines: true}
const server = new Proxy(
  Server,
  new LazyInit({
    arguments1: 1,
    arguments2: 2,
  })
);
```

In line 1, we've created a new [Proxy Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy).

In line 2, it is the object (class in this case) that we want to concerned with.

In line 3, it is our "hooker/trap" logic (aka handler) that we want the `Proxy` Object to execute.

## The handler

```js{numberLines: true}
class LazyInit {
  constructor(args) {
    this.server = null;
    this.initArgs = args;
  }

  get(target, prop, receiver) {
    if (!this.server) {
      this.server = new Server(this.initArgs);
    }
    return Reflect.get(this.server, prop);
  }
}
```

In line 7, we've defined a `get` [trap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/get), this will let the `Proxy` object know that we want to hook into any methods that is getting a property value.

In line 8, and 9, we will check for the existence of our `server` before calling it in line 11.

# Conclusion

And that's it! We've delayed the initialization of our server to just before any functions/variables were accessed!

Although we technically do not need to declare the `Proxy` target...

```js
// we can actually proxy an empty object
const server = new Proxy(
  {},
  new LazyInit({
    arguments1: 1,
    arguments2: 2,
  })
);

// instead of our Server class
const server = new Proxy(
  Server,
  new LazyInit({
    arguments1: 1,
    arguments2: 2,
  })
);
```

I would recommend you to provide it so as `Proxy` will forward the various function calls over to target for traps that were not implemented.
