import { defineConfig } from 'cypress'
import dotenv from 'dotenv'

dotenv.config()

const ip = process.env.IP

export default defineConfig({
  e2e: {
    baseUrl: `http://${ip}:5173`,
    specPattern: 'cypress/e2e/**/*.cy.{js,ts,jsx,tsx}',
  },
})