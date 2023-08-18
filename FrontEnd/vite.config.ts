/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        host: true,
        port: 8000,
        watch: {
            usePolling: true
        }
    },
    test: {
        globals: true,
        environment: 'jsdom',
        css: true,
        setupFiles: './src/test/setup.ts'
    }
});
