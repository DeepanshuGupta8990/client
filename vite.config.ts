import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as fs from 'fs'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [react(), tailwindcss(),],
    server: {
        // port needs to be picked from exported env variable
        port: Number(process.env.VFEED_WEBUI_PORT) || 5443,
        https: {
            key: fs.readFileSync('./certs/key.pem'),
            cert: fs.readFileSync('./certs/cert.pem')
        }
    }
})