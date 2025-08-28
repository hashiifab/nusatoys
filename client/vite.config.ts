import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	server: {
		proxy: {
			"/api": {
					target: "http://localhost:3000",
					changeOrigin: true,
					secure: false,
				},
			},
		},
	// Ensure all routes including admin routes are properly handled
	build: {
		outDir: "dist",
		emptyOutDir: true,
		assetsDir: "assets",
		ssrManifest: false,
		manifest: true,
		minify: true,
		// Force inclusion of all code, disable tree-shaking and code splitting
		rollupOptions: {
			output: {
				manualChunks: undefined,
				entryFileNames: 'assets/[name].js',
				chunkFileNames: 'assets/[name].js',
				assetFileNames: 'assets/[name].[ext]'
			},
			treeshake: false
		},
	},
});
