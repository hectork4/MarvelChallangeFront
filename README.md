# Marvel app Summary

## Arquitectura

La aplicación sigue una arquitectura basada en React para el front-end y Node.js para el back-end. El front-end utiliza un modelo de componentes con React, mientras que el back-end sigue un modelo MVC simplificado. Los datos de usuario se almacenan localmente en un archivo JSON en el back-end.

## Funcionalidad

- **Autenticación**: El sistema de autenticación permite a los usuarios registrarse, iniciar sesión y cerrar sesión. Las opciones de Login y Register se muestran si el usuario no está autenticado, y la opción de Logout se muestra si el usuario está autenticado.
- **Persistencia de Datos**: Los datos de usuario, como favoritos, se almacenan en el back-end y se persisten localmente.
- **Consumo de API**: Utiliza TanstackQuery para gestionar el almacenamiento en caché y mitigar problemas de tiempo de espera al consumir la API de Marvel.
- **Modo Sin Back-End**: La aplicación puede ser utilizada sin el back-end. En este modo, los usuarios pueden agregar personajes de Marvel como favoritos, pero esta selección no se persistirá una vez que se vuelva a ejecutar el sitio. Los personajes y detalles de los seleccionados se mostrarán correctamente, pero los favoritos no se guardarán entre sesiones.

## Seguridad

- **Tokens**: Los tokens se almacenan en el estado global y en sessionStorage durante las pruebas. La sesión del usuario se mantiene principalmente mediante cookies.
- **Errores de Autenticación**: Se ha implementado una solución con un mensaje genérico para manejar errores en la autenticación.

## Pruebas

- **Configuración**: Las pruebas están configuradas usando Jest. Puedes encontrar configuraciones adicionales en jest.config.js.
- **Ejecución**: Para lanzar las pruebas, se utiliza el comando npm run test. Para pruebas de cobertura, se utiliza npm test -- --coverage.
- **Back-end**: Algunas pruebas requieren que el back-end esté en funcionamiento en el puerto 3001.

## Scripts Disponibles

- **Desarrollo**: npm start para ejecutar la aplicación en modo de desarrollo.
- **Pruebas**: npm test para lanzar el corredor de pruebas en modo interactivo.
- **Producción**: npm run build para construir la aplicación para producción.

# Consideraciones

Este proyecto incluye un sistema de autenticación opcional. Al iniciar la aplicación, los usuarios verán las opciones de Login (Iniciar sesión) y Register (Registrarse) si no están autenticados. Por el contrario, si el usuario ya está autenticado, se mostrará la opción de Logout (Cerrar sesión) en lugar de las opciones de inicio de sesión y registro junto a nombre del usuario.

Para evaluar el sistema de autenticación, es necesario que el back-end esté en funcionamiento. Debe ejecutar el servidor del back-end, que se ejecutará en el puerto 3001. Asegúrese de que el back-end esté correctamente configurado y en ejecución para permitir que el sistema de autenticación funcione adecuadamente. Es preciso mencionar que los tests que requieren del backEnd fallaran si el mismo no está ejecutandose.

El back-end necesario para este proyecto está disponible en el siguiente repositorio: [https://github.com/hectork4/MarvelChallengeBack](https://github.com/hectork4/MarvelChallengeBack).

Si decide probar el sistema de autenticación, siga estos pasos:

Inicie el servidor del back-end: Asegúrese de que el back-end esté corriendo en el puerto 3001. Esto permitirá que la aplicación front-end se comunique correctamente con el servidor para manejar el inicio de sesión, el registro y la sesión del usuario.

## Opcional - Ejecutar BackEnd

### `npm run dev` <=== en la terminal del proyecto back

En el back-end, los datos de usuario (como el nombre de usuario, la contraseña y los favoritos) se almacenan localmente en un archivo JSON. Esta implementación permite que la selección de favoritos hecha en el front-end se persista de manera efectiva. El back-end está desarrollado en Node.js utilizando un modelo MVC simplificado. Esta aproximación se eligió para completar el proyecto en un plazo de menos de tres días.

En cuanto a la autenticación, aunque de manera temporal y no recomendada, los tokens se almacenan en el estado global y en sessionStorage durante las pruebas. Sin embargo, la sesión del usuario se mantiene principalmente mediante cookies, lo que permite la interacción continua con el back-end.

Actualmente, el consumo de la API de Marvel enfrenta varias dificultades, principalmente relacionadas con problemas de tiempo de espera (timeouts). Para mitigar estos problemas, se ha optado por utilizar TanstackQuery. Esta herramienta ayuda a gestionar el almacenamiento en caché de manera eficiente y asegura que, en la medida de lo posible, se reutilicen las respuestas obtenidas.

Debido a las limitaciones de tiempo durante las pruebas, el manejo de errores en la autenticación no se ha desarrollado de manera exhaustiva. En su lugar, se ha implementado una solución con un mensaje genérico cuando no se pudo ejecutar alguna petición al servidor correctamente.

Para los propósitos de prueba, se ha creado un usuario de prueba en la base de datos local que se utiliza en los tests del proyecto. Este usuario tiene las siguientes credenciales: {username: pepe, password: 123456}.

## Front End

Para que la aplicación funcione correctamente, necesitas configurar las siguientes variables de entorno en tu archivo .env de la forma en que sejé un template del mismo en el proyecto. Para ello debe considerar

- Regístrate en el Portal de Marvel Developer y obtén tus claves API.
- Genera el hash necesario para la autenticación con los valores de timestamp, privateKy y publicKey generados en el paso anterior.
- Configura las variables de entorno en tu archivo .env.

La construcción de la URL a ser consumida se realiza en el archivo data.ts en el source del proyecto.

## Scripts Disponibles

En el directorio del proyecto, puedes ejecutar:

### `npm start`

Ejecuta la aplicación en modo de desarrollo.\
Abre [http://localhost:3000](http://localhost:3000) para verlo en el navegador.

La página se recargará si haces modificaciones.\
También verás errores de lint en la consola.

### `npm test`

Lanza el corredor de pruebas en modo interactivo.\
Consulta la sección sobre [ejecución de pruebas](https://facebook.github.io/create-react-app/docs/running-tests) para más información.

### `npm run build`

Construye la aplicación para producción en la carpeta `build`.\
Agrupa correctamente React en modo de producción y optimiza la compilación para obtener el mejor rendimiento.

La compilación está minificada y los nombres de archivo incluyen los hashes.\
¡Tu aplicación está lista para ser desplegada!

Consulta la sección sobre [despliegue](https://facebook.github.io/create-react-app/docs/deployment) para más información.

### `npm run eject`

**Nota: esta es una operación unidireccional. ¡Una vez que `eject`, no puedes volver atrás!**

Si no estás satisfecho con la herramienta de construcción y las opciones de configuración, puedes `eject` en cualquier momento. Este comando eliminará la única dependencia de compilación del proyecto.

En su lugar, copiará todos los archivos de configuración y las dependencias transitivas (webpack, Babel, ESLint, etc.) directamente en tu proyecto para que tengas control total sobre ellos. Todos los comandos excepto `eject` seguirán funcionando, pero apuntarán a los scripts copiados para que puedas modificarlos. En este punto, estás por tu cuenta.

No tienes que usar `eject`. El conjunto de características curadas es adecuado para pequeños y medianos despliegues, y no deberías sentirte obligado a usar esta característica. Sin embargo, entendemos que esta herramienta no sería útil si no pudieras personalizarla cuando estés listo.

## Configuración del Entorno

Asegúrate de configurar las variables de entorno en el archivo `.env` basado en el archivo `.env.template`.

## Pruebas

Las pruebas están configuradas usando Jest. Puedes encontrar configuraciones adicionales en [jest.config.js](jest.config.js).

Para lanzar las pruebas ejecutar

### `npm run test`

Para lanzar las pruebas de cobertura

### `npm test -- --coverage`
