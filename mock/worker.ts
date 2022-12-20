import { setupWorker, rest, SetupWorkerApi } from 'msw';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);

declare global {
  interface Window {
    msw: {
      worker: SetupWorkerApi;
      rest: typeof rest;
    };
  }
}
window.msw = {
  worker,
  rest,
};
