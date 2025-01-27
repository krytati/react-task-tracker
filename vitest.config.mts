import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react'
import path from "path";

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        }
    },
    test: {
        include: ['**/*.{spec,test}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./setupTests.ts'],
        reporters: ['default'],
        silent: false,
    },
});