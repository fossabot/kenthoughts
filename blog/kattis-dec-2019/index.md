---
title: Dec 2019 Kattis
date: "2019-12-14T00:00:00.000Z"
description: Refreshing myself with C++
tags: kattis
---

### Things to be careful of, to avoid WA

---

1. `std::fixed` for fp number.

   when cout of fp number, they might be scientific or fixed depending on number of decimals

2. `std::cin` delimits automatically by spaces.

3. std::cin can be chained

   `std::cin >> a >> b;`

   populates first and second token to a and b respectively

### Things to be care of, to avoid TLE

1. Try calculating big O of algorithm
2. Try using simple hash
3. Try using DP

### Shorthands that are useful

1. `#define ii pair<int, int>`
   storing two integers, useful in 2d-mazes. Access elements by `first` and `second`

2. `#define vii vector<pair<int, int>>`
   storing ii in vectors

### Problems I'm able to solve

- math-based
- general knowledge
- dp

### Problems I'm unable to solve

- advanced graphing
- pathing

---

## Completion list

https://open.kattis.com/problems/password
https://open.kattis.com/problems/batterup
https://open.kattis.com/problems/howmanydigits (math)
https://open.kattis.com/problems/lastfactorialdigit
https://open.kattis.com/problems/juryjeopardy
https://open.kattis.com/problems/phonelist (js/node)
https://open.kattis.com/problems/display
https://open.kattis.com/problems/sgcoin
https://open.kattis.com/problems/anthonyanddiablo (math)
https://open.kattis.com/problems/santaklas (math)
https://open.kattis.com/problems/mastermind
https://open.kattis.com/problems/stringmatching (string algo)
https://open.kattis.com/problems/primesieve
https://open.kattis.com/problems/robotturtles (maze/graph/hard edgecases)
https://open.kattis.com/problems/inversefactorial (math)
https://open.kattis.com/problems/cursethedarkness (math)
https://open.kattis.com/problems/tsp (tsp, obviously)
https://open.kattis.com/problems/toys (math)
https://open.kattis.com/problems/secretsanta (math/hacks)
https://open.kattis.com/problems/battlesimulation
https://open.kattis.com/problems/ants

## Uncompletion list

https://open.kattis.com/problems/thekingofthenorth (maze/graph)

{/* commented out section
#### 13 Dec

Score: 163.7 Rank: 2595

#### 14 Dec

Score: 172.3 Rank: 2417

#### 15 Dec

Score: 178.6 Rank: 2306

### 17 Dec

Score: 186.6 Rank: 2203

### 18 Dec

Score: 189.1 Rank: 2168

### 21 Dec

Score: 204.1 Rank: 1978

### 24 Dec

Score: 209.7Rank: 1914

### 25 Dec

Score: 239.6 Rank: 1624

### 30 Dec

Score: 241.8 Rank: 1613

### 1 Jan

Score */}
