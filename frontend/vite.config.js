import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  define: {
    'process.env.API_BASE_URL': "'http://localhost:8080'",
  },
  plugins: [react()],
})
