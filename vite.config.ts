import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        port: 5173,
        proxy: {
            '/api/v1': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                cookieDomainRewrite: '',
            }
        }
    },
    resolve: {
        alias: {
            '$': path.resolve(__dirname, './src/assets'),
            "@": path.resolve(__dirname, "./src/modules"),
            "#": path.resolve(__dirname, "./src/"),
        },
    },
});
