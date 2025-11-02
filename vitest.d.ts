/// <reference types="vitest/globals" />

// This file adds Vitest global types to TypeScript
// It allows us to use describe, it, expect, vi, etc. without importing them

declare global {
  const vi: (typeof import('vitest'))['vi'];
  const describe: (typeof import('vitest'))['describe'];
  const it: (typeof import('vitest'))['it'];
  const expect: (typeof import('vitest'))['expect'];
  const test: (typeof import('vitest'))['test'];
  const beforeAll: (typeof import('vitest'))['beforeAll'];
  const afterAll: (typeof import('vitest'))['afterAll'];
  const beforeEach: (typeof import('vitest'))['beforeEach'];
  const afterEach: (typeof import('vitest'))['afterEach'];
}

export {};
