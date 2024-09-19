import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "node:path";
import dts from "vite-plugin-dts";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    // remix({
    //   future: {
    //     v3_fetcherPersist: true,
    //     v3_relativeSplatPath: true,
    //     v3_throwAbortReason: true,
    //   },
    // }),
    react(),
    tsconfigPaths(),
    dts({ include: ["src"] }),
  ],

  build: {
    copyPublicDir: false,
    rollupOptions: {
      external: ["react", 'react-dom', "react/jsx-runtime"],
      output: {
        assetFileNames: "assets/[name][extname]",
        entryFileNames: "[name].js",
        globals: {
          react: "React",
          "react-dom": "React-dom",
          "react/jsx-runtime": "react/jsx-runtime",
        },
      },
    },
    lib: {
      name: "dappkit",
      entry: path.resolve(__dirname, "/src/index.ts"),
      formats: ["umd"],
    },
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "/src"),
      src: path.resolve(__dirname, "/src"),
    },
  },
});
