---
layout: home

hero:
  name: "Ken Lee"
  text: "thoughts and et cetera"
  tagline: "A blog of what Ken ken do."
  
features:
  - title: Recent Posts
    details: Penning down thoughts, and ideas to share. During my commute, my brain digests through many thoughts of others. And through them, I pen down thoughts and ideas of yestermorning.
---

<script setup>
import { data as posts } from './.vitepress/theme/posts.data.mts'
</script>

<div class="blog-posts">
  <div v-for="post in posts" :key="post.url" class="post-list-item">
    <article itemscope itemtype="http://schema.org/Article">
      <header>
        <h2>
          <a :href="post.url" itemprop="url">
            <span itemprop="headline">{{ post.title }}</span>
          </a>
        </h2>
        <small v-if="post.tags">Tags: {{ post.tags }}</small>
        <br v-if="post.tags" />
        <small>{{ post.date }}</small>
      </header>
      <section>
        <p itemprop="description">{{ post.description || post.excerpt }}</p>
      </section>
    </article>
  </div>
</div>

<style scoped>
.blog-posts {
  max-width: 48rem;
  margin: 3rem auto;
  padding: 0 1.5rem;
}

.post-list-item {
  margin-bottom: 3rem;
  list-style: none;
}

.post-list-item h2 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-size: 1.75rem;
}

.post-list-item header small {
  color: var(--vp-c-text-2);
}

.post-list-item section {
  margin-top: 0.5rem;
}
</style>
