import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'payup.austral.com',
  appName: 'PayUp',
  webDir: 'dist',
  android: {
    allowMixedContent: true
  }
};

export default config;
