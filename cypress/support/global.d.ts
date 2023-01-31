import { login } from './commands/login';

declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * Login via API.
            */
            login: typeof login;
        }
    }
}