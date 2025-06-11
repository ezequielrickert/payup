import { defineConfig } from 'cypress'
import { config as dotenvConfig } from 'dotenv'
import { resolve } from 'path'

dotenvConfig({ path: resolve(__dirname, '.env') })

const ip = process.env.IP

export default defineConfig({
  e2e: {
    baseUrl: `http://${ip}:5173`,
    specPattern: 'cypress/e2e/**/*.cy.{js,ts,jsx,tsx}',
  },
})