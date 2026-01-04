<script setup lang="ts">
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

const { theme } = useData()

const bio = {
  name: 'Ken Lee',
  twitter: 'kenleesm',
  short: false
}
</script>

<template>
  <div class="bio">
    <img 
      src="/images/profile-pic.png" 
      :alt="bio.name"
      class="bio-avatar"
    />
    <div class="bio-content">
      <p class="bio-intro">
        I'm <a :href="`https://twitter.com/${bio.twitter}`" target="_blank">{{ bio.name }}</a> 🇸🇬
      </p>
      <p class="bio-description">
        {{ bio.short 
          ? "Thinking and trying to build useful things." 
          : "Penning down thoughts, and ideas to share. During my commute, my brain digests through many thoughts of others. And through them, I pen down thoughts and ideas of yestermorning."
        }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.bio {
  display: flex;
  margin-bottom: 2.5rem;
}

.bio-avatar {
  flex-shrink: 0;
  margin-right: 0.875rem;
  margin-bottom: 0;
  min-width: 3.5rem;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}

.bio-content {
  flex: 1;
}

.bio-intro {
  margin-bottom: 0;
  margin-top: 0;
}

.bio-description {
  margin-top: 0.5rem;
}
</style>
