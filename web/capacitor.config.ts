import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.payup.app',
    appName: 'payUp',
    webDir: 'dist',
    server: {
        // Aquí pones la URL donde está corriendo tu backend
        // Si tu server corre en localhost:3000, usa tu IP local
        url: 'http://TU_IP_LOCAL:PUERTO_DEL_SERVER',
        cleartext: true
    }
};

export default config;
