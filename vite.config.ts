import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';


export default defineConfig({
    plugins: [
        react(),
    ],
    resolve:{
        alias:{
            '@' : path.resolve(__dirname, './src')
        },
    },
    build: {
        outDir: 'docs',
        rollupOptions: {
            output: {
                manualChunks: {
                    'poweraudio': ['poweraudio'],
                },
            },
        },
    },    
    
});
