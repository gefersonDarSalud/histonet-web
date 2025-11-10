
export const SERVER_HOST = String(import.meta.env.VITE_SERVER_HOST) || "http://[::1]";
export const SERVER_PORT = import.meta.env.VITE_SERVER_PORT || 3000;
export const SERVER_VERSION = String(import.meta.env.VITE_SERVER_VERSION) || "api/v1";
export const serverUrl = `${SERVER_HOST}:${SERVER_PORT}/${SERVER_VERSION}`;
export const MIN_ID_LENGTH = 5;
export const MAX_ID_LENGTH = 12;


