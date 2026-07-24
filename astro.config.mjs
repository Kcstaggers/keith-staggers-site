import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://www.keithstaggers.com',
  compressHTML: true,
  trailingSlash: 'always',
  vite: {
    plugins: [tailwindcss()],
  },
});
