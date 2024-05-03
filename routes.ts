/**
 * An array of routes that are accessible to the public
 * do not need authentication
 * @type {string[]}
 */
export const publicRoutes = [
    "/",
    "/email-verification"
]

/**
 * An array of routes that are used for authentication
 * user will be redirected to these for autentication
 * @type {string[]}
 */

export const authRoutes = [
    "/login",
    "/register",
    "/auth-error",
    "/reset-password",
    "/new-password"
]

/**
 * The prefix for API authentication routes
 * routes that start with this prefic are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * redirec user to this route after successful login
 * @type {string[]}
 */

export const DEFAULT_LOGIN_REDIRECT = "/profile"