import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    root: __dirname,
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
    environment: 'jsdom',
    coverage: {
      reporter: ['text', 'html'],
      thresholds: {
        global: {
          statements: 80,
          branches: 50,
          functions: 50,
          lines: 50,
        },
      },
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: [
        'src/**/*.test.{js,jsx,ts,tsx}',
        'src/**/*.spec.{js,jsx,ts,tsx}',
        'src/index.{js,jsx,ts,tsx}',
        'src/setupTests.{js,ts}',
        'src/**/*.d.ts',
        'src/main.tsx',
      ],
    },
  },
})
