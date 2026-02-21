import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    host: '0.0.0.0',  // Escucha en todas las interfaces de red
    port: 5173,       // Puerto que estás utilizando
    watch: {
      usePolling: true,  // Necesario para desarrollo en contenedores
    },
  }
});
