
export const config = {
    authApiUrl: import.meta.env.VITE_AUTH_SERVICE_URL || "http://localhost:80/api",
    vfeedApiUrl: import.meta.env.VITE_VFEED_SERVICE_URL || "http://localhost:80/api"
};