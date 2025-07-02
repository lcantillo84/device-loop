import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1000, // Increase limit to 1MB
  },
  base: '/', // ✅ this line is critical
  plugins: [react()],
})
