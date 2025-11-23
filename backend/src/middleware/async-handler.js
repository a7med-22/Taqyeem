/**
 * Async handler wrapper to catch errors in async route handlers
 * This is needed for Express 4.x which doesn't automatically handle async errors
 * Express 5.x handles this automatically
 */
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
