import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://keithstaggers.com',
  compressHTML: true,
  vite: {
    plugins: [tailwindcss()],
  },
});
