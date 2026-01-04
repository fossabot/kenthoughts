---
title: Null vs Option Types
date: "2019-12-27T00:00:00.000Z"
description: Why we need option types
tag: typing
draft: true
---

- history

  - c has pointers, which stores a numeric value of an address of interest

    - most language allows you to separate variable declaration away from their initialization
      - this means that the variable can be referenced before it has any data
        - powerful but require skillful \<something>..?
    - introduced null types where there's currently not holding any address
    - c has static analysis but doesn't require any checks to ensure that is is holding an invalid address

  - referece to guy who said its a mistake

- has its roots in functional programming
  - need to find research?

* option type is a type which helps in the abovementioned case
  - an type has to be either always valid or sometimes valid
  - if it is sometimes valid, then the referer has to check that the value is valid before accessing it
