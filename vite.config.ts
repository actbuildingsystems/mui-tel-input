import { resolve } from 'node:path'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import dts from 'vite-plugin-dts'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true
  },
  resolve: {
    alias: {
      "@assets": resolve(__dirname, "./src/assets"),
      "@shared": resolve(__dirname, "./src/shared"),
      "@components": resolve(__dirname, "./src/components")
    }
  },
  build: {
    target: "esnext",
    minify: false, // Let the consuming project handle minification
    lib: {
      formats: ["es"],
      entry: resolve(__dirname, "src/index.tsx"),
      name: "MuiTelInput",
      fileName: () => "index.js" // Simple filename
    },
    rollupOptions: {
      external: () => true, // Externalize everything - no bundling
      output: {
        preserveModules: true, // Keep original module structure
        preserveModulesRoot: "src",
        entryFileNames: "[name].js",
        format: "es"
      }
    }
  },
  plugins: [
    react({
      jsxRuntime: "automatic"
    }),
    dts({
      exclude: ["/**/*.stories.tsx", "/**/*.test.tsx"],
      rollupTypes: true,
      insertTypesEntry: true
    })
  ]
})