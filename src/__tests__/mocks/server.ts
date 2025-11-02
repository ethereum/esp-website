import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// Setup MSW server with handlers
export const server = setupServer(...handlers);

// Export type for better TypeScript support
export type Server = ReturnType<typeof setupServer>;
