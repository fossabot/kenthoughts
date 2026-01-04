---
title: An if without else
date: "2020-04-21T00:00:00.000Z"
description: Coding without an else in your prose, and use return!
tags: monthly, coding, new-to-coding
draft: false
codeReadTimes: 6
---

`if` and `else`. These two are the iconic duo, in programming. Tell
a programmer an `if` and they will respond with `else`.
It is the bread and butter, the building block of a programmer's
life. The next step after `"hello world"`.

And that's the issue.

Having to review quite a number of junior developers' code,
I've seen way too many undue usages of `else` and some times `else if`.
It's true, there are cases which warrant the use of `else`, but there are way more
cases which don't.

Let's explore.

The use of `if` is to approach a flow happens sometimes, but not happening
all the time.

Let's take the classic `fizzbuzz` problem.

```md
> Write a program that prints the numbers from 1 to 100.
> But for multiples of three print "Fizz" instead of
> the number and for the multiples of five print "Buzz".
> For numbers which are multiples of both three and
> five print "FizzBuzz".
```

The naive solution is as such:

```python
def foo(i):
  if i % 15 == 0:
    print("FizzBuzz")
  else if i % 3 == 0:
    print("Fizz")
  else if i % 5 == 0:
    print("Buzz")
  else:
    print(i)
```

Notice that there are quite a couple of `else` statements in there.
From this snippet the three `else` are readable. But what if we increase the
complexity of the code?

Instead of printing, we want to return the output, as well as when
the value is a multiple of 3 we want to call `function bar`.

```python
def foo(i):
  x = ''
  if i % 15 == 0:
+   bar()
    x = "FizzBuzz"
  else if i % 3 == 0:
+   bar()
    x = "Fizz"
  else if i % 5 == 0:
    x = "Buzz"
  else:
    x = i

  return x
```

Let's go one more level
of complexity. If the value is even and is not a multiple of 3 or 5, we want
to negate the value of it.

```python
def foo(i):
  x = ''
  if i % 15 == 0:
    bar()
    x = "FizzBuzz"
  else if i % 3 == 0:
    bar()
    x = "Fizz"
  else if i % 5 == 0:
    x = "Buzz"
+ else if i % 2 == 0:
+   x = -i
  else
    x = i

  return x
```

Here we have quite a few alterations done since we have first written
down the first line of code. What we have achieved is usually what
happens as your requirements change.

Notice that in order to fulfill our requirements of returning the data,
we have created a local variable `x` in the first statement of `foo`.

And it was returned on the final statement of `foo`. Given that this
is the first time you have seen this code, would you be able to confidently
identify that `x` is not modified within the other scopes of `if` s and `else if`s?

Let's take a look at another approach. One without `else`, and using `return` on every `if` block.

```python
def foo(i):

  if i % 15 == 0:
    bar()
    return "FizzBuzz"
  if i % 3 == 0:
    bar()
    return "Fizz"
  if i % 5 == 0:
    return "Buzz"
  if i % 2 == 0:
    return -i

  return i
```

This allows us to avoid creating a local variable and provides clarity. For instance,
when you are tracing code, we are able to immediately observe the scope of the code!
We don't need to trace what happened to `x` before it was returned!
