// Type declarations for test mocks
declare module './mocks/server' {
  import type { SetupServer } from 'msw/node';
  export const server: SetupServer;
}

declare module './mocks/handlers' {
  import type { RequestHandler } from 'msw';
  export const handlers: RequestHandler[];
}

