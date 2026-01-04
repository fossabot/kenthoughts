---
title: JSC Number Objects
date: "2020-12-11T00:00:00.000Z"
description: Everything in JS are objects, even arrays.
tags: react-native, jsc, javascriptcore, objects
draft: false
---

Yet another issue during my day job. However, this didn't happen recently. It was an incident about a year back.

It was about storing numbers in a JavaScript object and memory spikes.

```js
const obj = {};
obj[1] = "hej";
```

And recently, one of my colleagues mentioned something about this JS number-object issue. To be specific, it wasn't just storing any number, it was a bunch of number-string key-values stored in an object, and the keys are **five digit numbers**.

```js
const obj = {};
obj[12345] = ":("; // memory spike happens
obj[123456] = ":)"; // memory spike is gone
```

Well, why would this even happen? Why would storing objects, which probably reasonable for us to assume that it will be stored as a `dict` i.e., `hashtables` would be grabbing a whole bunch of memory?

> I don't recall exactly how much memory it took, but it was around the ballpark values of 10mb

It turns out that the jsc has an optimization where objects that only contains integer keys would be initialized as an array!