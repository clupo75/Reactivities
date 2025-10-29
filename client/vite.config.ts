import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import mkcert from 'vite-plugin-mkcert'

// https://vite.dev/config/
export default defineConfig({
  // configure the development server to run on port 3000
  server: {
    port: 3000,
  },
  plugins: [react(), mkcert()],
})
