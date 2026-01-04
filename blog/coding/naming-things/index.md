---
title: Naming Things
date: "2020-04-24T00:00:00.000Z"
description: Naming function, naming variables, naming is hard.
tags: monthly, coding, naming
draft: false
codeReadTimes: 2
---

Naming things is one of the [two hard](https://martinfowler.com/bliki/TwoHardThings.html)
things in Computer Science.

Probably a phrase that you have seen hundreds of times. But why is it hard? Isn't naming
things simply an act of assigning characters to that particular entity? Heck, in Computer Science,
the name does not even need to be [pronounceable](https://wiki.c2.com/?TrulyHorribleAcronyms).

So what exactly is the fuss about _naming things_?

Let me ask you, why do we name? No I am not speaking about
[this](https://www.newyorker.com/tech/annals-of-technology/the-power-of-names) or
[that](https://www.quora.com/Is-there-a-psychological-explanation-for-why-humans-name-things).

We name variables, to express an intention. To explain what we want to achieve, or how
we are achieving it.

For instance, a function that compares two numbers and returns the larger number.

```js
func a(int b, int c) {
  return b > c ? b : c;
}
```

Notice that we have used the arbitrary characters a, b, c to name the function and parameters. By practising good naming conventions, we can better express our intent.

```js
func getLargerInt(int l, int r) {
  return l > r ? l : r;
}
```

It is up to us, to name a value `a`, or `l`, or `left`. How do we decide exactly _how_ to name?

This, my friend, is the _fuss_ about naming things.

We know that naming things `a` is **bad** most of the time. But some of the time, **acceptable**.

We know that naming things `left` is good most of time, but on occasions, **bad**.
