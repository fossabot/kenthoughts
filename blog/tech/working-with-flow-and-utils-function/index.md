---
title: Dec 15 2019 Dailies
date: "2019-12-20T00:00:00.000Z"
description: Working with flow and utils function
tag: flow, utils
draft: true
---

How often do we face the issue where one single utils function serves different API structure and still require flow to work nicely with it?

```
type CarAPIResponse = {
  name: string,
  color: string,
  parts: {
    wheels_count: number,
  },
  price: number,
}

type TruckAPIResponse = {
  name: string,
  color: string,
  parts: {
    wheels_count: number,
  },
  price: number,
}

type CatAPIResponse = {
  name: string,
  color: string,
  body: {
    stripes_count: number,
  },
}

const cat: CatAPIResponse = {
  name: 'persian',
  color: 'beige',
  body: {
    stripes_count: 9,
  }
}
```
