---
title: Box-sizing, my personal notes
date: "2021-03-04T00:00:00.000Z"
description: Box-sizing; Diving and thinking
draft: false
codeReadTimes: 2
---

I was hosting an internal sharing where we explore app development frameworks which are not react-native, and our topic was on "Flutter".

As I was doing my reading on flutter, I found that they've mentioned on box-sizing. Being react-native dev, my focus wasn't completely on CSS, and thus not knowning exactly what `box-sizing` does. Fortunately, there's a css-tricks [article](https://css-tricks.com/box-sizing/) on it; always able to trust the internet on answering my questions.

From the article we learn that box-sizing is a CSS property that affects how the final width of the rendered element is calcualted.

```
box-sizing: content-box;
```

This is the traditional (read: initial) design of calculating element sizes are.
Final Width = Declared (Width + Padding + Border)

This makes it very simple for any web developer to exactly model what the final width from the given values. However, this may pose a problem if we are trying to design from the out-in form.

If we want an object to completely cover the whole width of the screen, but yet keep some border to itself, we would need to write as such:

```
CONTENT_WIDTH = SCREEN_WIDTH - PADDING - BORDER;
WIDTH = SCREEN_WIDTH;
```

Now, there's a solution if we want instead define from the other way round.

```
box-sizing: box-content
WIDTH = SCREEN_WIDTH
```

And that's it. The `CONTENT_WIDTH` would be automatically calculated.
