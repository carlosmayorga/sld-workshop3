# sld-workshop3
UTP Workshop - Serverless Cloud Functions :rocket:


1. Descarga el codigo en tu maquina
2. Luego, dentro de la carpeta functions, ejecuta el comando `npm install`
3. Entra a Firebase, en la opcion de Firestore, y crea una base de datos
4. Ve a configuracion del proyecto > Cuentas de servicio > SDK de Firebase Admin > Generar nueva clave
5. La clave json que ha descargado, colocala en la carpeta `secure` dentro de src y lib
6. En el archivo index.ts, en la linea `const serviceAccount = require('./secure/`nombre del archivo de clave`.json)` 
7. En el archivo index.ts, en la linea `databaseURL:` colocaras el url de tu base de datos, este lo veras en la pantalla SDK de Firebase Admin
8. Escribe el comando, `npm run build` y luego firebase emulators:start
9. Listo, prueba y desarrolla en local tus propias Cloud Functions

Snipet para request de "apiv1/users"
```json
{
   "name":"abcd",
   "last_name":"abcd",
   "address":"Panamá"
}
```
