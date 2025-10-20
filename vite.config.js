import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: (() => {
    const b = process.env.VITE_BASE || '/';
    return b.endsWith('/') ? b : `${b}/`;
  })(),
  plugins: [react()],
});
