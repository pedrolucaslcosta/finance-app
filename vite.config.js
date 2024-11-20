import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.tsx',
            refresh: true,
        }),
        react(),
    ],
    server: {
        host: true, // Permite que o Vite escute em todas as interfaces de rede
        port: 5173, // Porta padrão, você pode alterar
        strictPort: true, // Garante que a porta será reservada
    },
});
