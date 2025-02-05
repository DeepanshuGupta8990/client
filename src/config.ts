/*
 * Copyright (C) Zetafence 2021-2025
 */
export const config = {
    authApiUrl: import.meta.env.VITE_AUTH_SERVICE_URL || "https://api.vfeed.io:443/v1",
    vfeedApiUrl: import.meta.env.VITE_VFEED_SERVICE_URL || "https://api.vfeed.io:443/v1"
};