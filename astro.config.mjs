// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypePrettyCode from 'rehype-pretty-code';
import mermaid from 'astro-mermaid';

/** @type {import('rehype-pretty-code').Options} */
const prettyCodeOptions = {
  theme: {
    light: 'github-light',
    dark: 'github-dark',
  },
  keepBackground: false,
  defaultLang: 'plaintext',
};

// https://astro.build/config
export default defineConfig({
  site: 'https://intptrr.cc',

  vite: {
    plugins: [tailwindcss()],
  },

  // astro-mermaid runs first so its remark plugin extracts mermaid blocks
  // before rehype-pretty-code would syntax-highlight them.
  integrations: [
    mermaid({
      theme: 'default',
      autoTheme: true,
      enableLog: false,
    }),
  ],

  markdown: {
    syntaxHighlight: false,
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex, [rehypePrettyCode, prettyCodeOptions]],
  },
});
