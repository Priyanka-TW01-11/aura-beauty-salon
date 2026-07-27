import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // proxy /api calls to `vercel dev` when running the serverless
    // booking-agent function locally (see README "Local dev with the AI agent")
  },
});
