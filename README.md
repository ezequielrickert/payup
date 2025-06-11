- .env templates en cada modulo para completar con su ip propia
- ya cambiada la ip, se ejecuta los siguiente:
- correr dentro de modulo web:
    - npx cap sync
    - npm run build
    - npx cap copy
    - con eso ya se puede correr el apk traquilamente

- para correr appium:
    - hacer los pasos de arriba
    - hacer el apk con el comando "./gradlew assembleDebug" dentro de android
    - hacer docker compose up de server
    - correr appium con el comando "appium" en la terminal
    - correr el emulador de android con el comando "emulator -avd Medium_Phone_API_36.0" (creo que en android)
    - ejecutar test script en el package.json de appium-tests
      E
