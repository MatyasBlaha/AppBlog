import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  define: {
    'process.env.REACT_APP_BASE_URL': "'http://localhost:8080'",
  },
  plugins: [react()],
})
