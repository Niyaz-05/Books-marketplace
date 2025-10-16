import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Books-marketplace/', // Add this line
  plugins: [react()],
});
