// Global test setup. Loaded via vitest.config `setupFiles`.
// Adds jest-dom matchers (toBeInTheDocument, toHaveValue, ...) to expect. Importing this in the
// default `node` environment is harmless — it only augments expect; the DOM matchers are exercised
// only by the jsdom-environment component tests (`// @vitest-environment jsdom`).
import '@testing-library/jest-dom/vitest';

// Chakra's Radio/Checkbox pull in @zag-js/focus-visible, which patches
// `HTMLElement.prototype.focus` on mount. jsdom defines `focus` as a getter-only accessor, so the
// reassignment throws "Cannot set property focus ... which has only a getter". Redefine it as a
// writable data property up front. Guarded to the jsdom environment (no-op under `node`).
if (typeof HTMLElement !== 'undefined') {
  Object.defineProperty(HTMLElement.prototype, 'focus', {
    configurable: true,
    writable: true,
    value: HTMLElement.prototype.focus ?? function focus() {}
  });
  Object.defineProperty(HTMLElement.prototype, 'blur', {
    configurable: true,
    writable: true,
    value: HTMLElement.prototype.blur ?? function blur() {}
  });
}
