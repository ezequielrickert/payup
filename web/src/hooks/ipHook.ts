export function getIp() {
    return import.meta.env.VITE_IP || "localhost";
}