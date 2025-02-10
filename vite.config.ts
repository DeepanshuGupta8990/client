import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as fs from 'fs';

export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync('./certs/key.pem'),
      cert: fs.readFileSync('./certs/cert.pem')
    }
  }
});