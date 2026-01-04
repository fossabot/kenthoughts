import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Ken Lee, thoughts and et cetera",
  description: "A blog of what Ken ken do.",
  
  ignoreDeadLinks: true,
  
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Blog', link: '/' },
      { text: 'About', link: '/me/' }
    ],

    sidebar: [],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/kenlsm' },
      { icon: 'twitter', link: 'https://twitter.com/kenleesm' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/kenlsm/' }
    ],

    footer: {
      message: 'Him on <a href="https://twitter.com/kenleesm" target="_blank">X</a> | <a href="http://github.com/kenlsm" target="_blank">Github</a> | <a href="https://www.linkedin.com/in/kenlsm/" target="_blank">LinkedIn</a> | <a href="https://engineers.sg/presenter/ken-lee--1229" target="_blank">EngineerSG</a>',
      copyright: 'Copyright © 2024-present Ken Lee'
    }
  },
  
  // Configure content directory
  srcDir: '.',
  
  // Clean URLs (no .html)
  cleanUrls: true,
  
  // Head tags
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'author', content: 'Ken Lee' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Ken Lee, thoughts and et cetera' }]
  ]
})
