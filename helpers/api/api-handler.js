import { errorHandler } from './error-handler'
import { jwtMiddleware } from './jwt-middleware';

export { apiHandler };

// API Middleware to check JWT tokens
function apiHandler(handler) {
    return async (req, res) => {
        try {
            await jwtMiddleware(req, res);

            await handler(req, res);
        } catch (err) {
            errorHandler(err, res);
        }
    }
}