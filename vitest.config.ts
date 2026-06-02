import { defineConfig } from 'vitest/config';
import path from 'path';
import { config } from 'dotenv';

config({ path: '.env.local' });

export default defineConfig({
  test: {
    globals: true,
    // Default environment is `node` (Salesforce/API/unit tests). Component tests opt into jsdom
    // per-file with a `// @vitest-environment jsdom` pragma at the top of the file.
    environment: 'node',
    setupFiles: ['src/__tests__/setup.ts'],
    include: ['src/__tests__/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['node_modules', '.next', 'dist'],
    testTimeout: 30000, // 30 seconds for Salesforce API calls
    hookTimeout: 30000,
    // Swallow the `motion() is deprecated` notice that Chakra UI v2 emits via framer-motion v11
    // internally (not our code, nothing to fix). Everything else still prints.
    onConsoleLog: log => (log.includes('motion() is deprecated') ? false : undefined)
  },
  // Match Next's automatic JSX runtime so components that use JSX without importing React
  // (e.g. the UI icon files) transform correctly under vitest.
  esbuild: {
    jsx: 'automatic'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
