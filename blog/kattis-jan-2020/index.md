---
title: Jan 2020 Kattis
date: "2020-01-01T00:00:00.000Z"
description: Rememberance of my Math and CS lectures
tags: kattis
---

Just before 2019 ended, Jen and I set out to review and plan our one-year resolution for the year of 2020, AKA, new year resolution. As part of my list of resolutions, I had set myself to reach a certain goal in kattis. It will be a busy yet exciting year ahead :)

### Things to be careful of, to avoid WA

---

1. `map.insert` doesn't replace value if it exists
   had to insert and then find and replace again

   using `map['foo'] = bar` is simpler

2. `#include <iomanip>` [DOCS](https://en.cppreference.com/w/cpp/io/manip) for various io manipulation, such as `setw`, `setfill`, `hex`, and `uppercase`

### Things to be careful of, to avoid TLE

1.

### Shorthands that are useful

1. define query variables as global
   antipattern IRL, but we are problem-solving instead of software building :P
2. `#define psi pair<string, int>` for map usage

3. `stringstream ss(query)` is useful if needed to tokenize
4. `stream.peek() == EOF` can be used to detect if EOF

---

## Completion list

https://open.kattis.com/problems/bits (cs)
https://open.kattis.com/problems/guessinggame
https://open.kattis.com/problems/tourdefrance (edge case with whole numbers)
https://open.kattis.com/problems/treasurehunt (maze)
https://open.kattis.com/problems/throwns (ds, edge case with neg)
https://open.kattis.com/problems/variablearithmetic (string manipulation in c++)
https://open.kattis.com/problems/arithmetic (cs)
https://open.kattis.com/problems/alldifferentdirections
https://open.kattis.com/problems/areyoulistening

## Uncompletion list

https://open.kattis.com/problems/bard (WA)
https://open.kattis.com/problems/continuousmedian (WA)
https://open.kattis.com/problems/narrowartgallery (no solution)


{/*
commented out section

### 1 Jan

Score: 252.6 Rank: 1525

### 3 Jan

Score: 258.0 Rank: 1490

### 4 Jan

Score: 266.1 Rank: 1431

### 5 Jan

Score: 270.0 Rank: 1400

### 18 Jan

Score: 280.5 Rank: 1333
*/}
