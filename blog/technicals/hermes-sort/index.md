---
title: Adding Hermes Stable Sort Part 1
date: "2020-06-19T00:00:00.000Z"
description: Hermes doesn't have a stable sorting algorithm, here's my progress adding them
tags: hermes, react-native, sort, timsort
draft: false
---

As I am working as React Native developer in my day job, I too, have encountered the issue of Array.prototype.sort being [unstable](https://github.com/facebook/hermes/issues/212).

> What? Array.sort is unstable? It's 2020, who is still using an unstable sorting algorithm?

Tht was what my initial thoughts were when I first discovered this fact. FYI, tc39 has [already](https://github.com/tc39/ecma262/pull/1340) specified that Array.prototype.sort should be stable.

As one of the contributors had mentioned that React Native is an open-sourced project, we can make a pull request to add it. And that's what I will attempt to do. :)

After spending some time mucking around the codebase, these were my questions in mind. How to build hermes? What do we need to build? Where's the executable?

Typing in those strange commands found on the readme, which I've to assume it works, with courage I pushed the enter button and lo and behold, there's a whole build folder appearing in front of my eyes.

After a few hours of bashing around I've managed to get throught the tests and now we're able to get to the next step.

Diving into the code! First, to start, where is the file we should be looking at? As pointed out by `dulinriley`, he advised us to start looking from `lib/VM/JSLib/Array.cpp` and observe that `arrayPrototypeSort` is the function we are looking at.

```cpp
  StandardSortModel sm(runtime, O, compareFn);

  // Use our custom sort routine. We can't use std::sort because it performs
  // optimizations that allow it to bypass calls to std::swap, but our swap
  // function is special, since it needs to use the internal Object functions.
  if (LLVM_UNLIKELY(quickSort(&sm, 0u, len) == ExecutionStatus::EXCEPTION))
    return ExecutionStatus::EXCEPTION;

  return O.getHermesValue();
```

For those that are unfamiliar, `LLVM_UNLIKELY` is a branching optimization for the compiler to opt for a certain path to take.

## Segue into branches

Branches are one of the worst nightmares for a CPU as the CPU cannot utilize [instruction pipeline](https://en.wikipedia.org/wiki/Instruction_pipelining) efficiently as only one of the branch is eventually taken. Work done from the other path, if evaluated, would be discarded. Thus, it has to pick one that is most `LIKELY` to be eventually taken.

```js
func foo() {
    if(Math.random() < 0.01) { // path taken only 1% of the time
        doVeryExpensiveTask();
        return 1;
    }
    doVeryTediousTask();
    return 2;
}
```

The CPU at on L2 can choose to assume that the path would be taken, and begin pipelining `doVeryExpensiveTask()` or do `doVeryTediousTask()`. Either one would be discarded.

Assuming that the CPU would always assume that every branching is taken, then it would waste 99% of its work. While if the CPU assumes that every branch is NOT taken, then it would waste only 1% of its work.

As a programmer, we can do better. By heuristics/intuition/statistics, we can predict whether the branch would be taken or not, and let the CPU know, through `LLVM_UNLIKELY|LLVM_LIKELY`.

Back to `timSort()`.

TimSort has quite a number of strategies. And each strategy can be made into its own independent functions.

## Standard Issues

These are standard issue sorting implementations which is utilized within TimSort.
`Binary Sort`, the algorithm utilized to extend merge sorts runs

- based off insertion + binary search to insert?

`Merge Sort`, the main merging algorithm to conduct the merging process

## Merge brothers

`merge_lo()` and `merge_hi()`

## Finalizer

`merge_collaspe()`

## Fast find

`gallop_left` and `gallop_right`

# Phase 0: Switch

Opting to use insertion sort for small-sized arrays

# Phase 1: Init

TimState. A state to keep track of various states we would require. As TimSort is an adaptive sorting algorithm, we would be referencing those states to decide our next best choice.

Creating merge state

- setting `min_gallop=6/7` (gonna use this later)

Setting minrun=merge_compute_minrun()
-> trying to find a good value for minrun

## Segue

What is minrun?

- the minimum threshold value used to define a "run"
- the runs are eventually used for merge sort, can say that for every mergesort, each partition is >= minrun

Why minrun is important?

- a bad minrun can set up a situation where mergesort is non-ideal

```
// bad run
[1], [2], [3], [4], [5]
------------------------------------
[1, 2]    [3, 4],   [5]
------------------------------------
[1, 2, 3, 4],       [5]
------------------------------------
[1, 2, 3, 4, 5]

// good run
[1], [2], [3], [4], [5], [6], [7]
------------------------------------
[1, 2]    [3, 4],   [5, 6],   [7]
------------------------------------
[1, 2, 3, 4],       [5, 6, 7]
------------------------------------
[1, 2, 3, 4, 5, 6, 7]

// optimal run
[1], [2], [3], [4], [5], [6], [7, 8]
------------------------------------
[1, 2]    [3, 4],   [5, 6],   [7, 8]
------------------------------------
[1, 2, 3, 4],       [5, 6, 7, 8]
------------------------------------
[1, 2, 3, 4, 5, 6, 7, 8]
```

Notice how the bad run was 2^n + 1? It took the same number of pass as 2^(n + 1)! The number of passes needed is exactly the height of the mergesort tree! Thus, it is to our advantage that we avoid the bad runs, where the number of "sets", is just a little higher than 2^n. In fact, we should strive to have "sets" to be 2^n, or just a little lower than 2^n.

Refer to [Timsort - Computing minrun] section for more details.

How to find a good minrun then?

To find a "good" minrun, we must first define what is "good".

`q, r = divmod(N, minrun)`

`N` refers to the total number of elements to sort
`minrun` refers to the number of elements per set

`q` refers to the number of "sets" we will get
`r` refers to the extra "set" we will get if it is non-zero

In Peter's listsort.txt, he explained, minrun should be a number that puts q to be a power of 2, or strictly less than a power of 2. We can freely choose a minrun, as that doesn't have any restriction.

The formula given by Peter was to take a first 6 bits and add 1 if any of the remaining bits were set.

```
Given
+------------+
|101100111000|
+------------+

+-------------+
|101100|111000|
+-------------+
101100 +
```

How does that even work?

Take a look again at the

```
+-------------+
|  Q   |   R  |
+-------------+
```

And switch to base 10 (as us humans are more adept with it).

We want to find a minrun that puts q to be a power of 10^n, or strictly less than 10^n, our minrun will take the first two digits and add 1 if any of the remaining digits were more than 1.

What we want to achieve is a good minrun that will give us a Q that is close to

```
+------+
|123400|
+------+
minrun                  = 12 + 1
Q = floor(123400/13)    = 9400
R = 123400 - Q * minrun = 4
```

Notice how this algorithm brings our number close to 10^4 (10,000)?

This works through selecting a divisor that is at or slightly larger than the
We add 1 if the remaining bits are set as those would spill over to the remainder. For instance:

```
+----+
|1234|
+----+
-> in this form
+-------------+
|  Q   |   R  |
+-------------+
-> looks like this
+-----+
|12|34|
+-----+

1234 = 1200 + 34
```

As we can observe, 1200 is equivalent to 100 \* 12, which fits perfectly to our requirements of Q being a power of 10^n. However, the remainder of 34 breaks this whole equation up. Consequently, if we add 1 to the divisor and the new divisor to be 13, Q will still be a number smaller and close to 10^n!

# Phase 2:

TBC

## References

- [Timsort](https://svn.python.org/projects/python/trunk/Objects/listsort.txt) -- by the man himself
