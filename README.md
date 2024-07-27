## Consideraciones

Este proyecto incluye un sistema de autenticación opcional. Al iniciar la aplicación, los usuarios verán las opciones de Login (Iniciar sesión) y Register (Registrarse) si no están autenticados. Por el contrario, si el usuario ya está autenticado, se mostrará la opción de Logout (Cerrar sesión) en lugar de las opciones de inicio de sesión y registro.

Para evaluar el sistema de autenticación, es necesario que el back-end esté en funcionamiento. Debe ejecutar el servidor del back-end, que se ejecutará en el puerto 3001. Asegúrese de que el back-end esté correctamente configurado y en ejecución para permitir que el sistema de autenticación funcione adecuadamente.

Si decide probar el sistema de autenticación, siga estos pasos:

Inicie el servidor del back-end: Asegúrese de que el back-end esté corriendo en el puerto 3001. Esto permitirá que la aplicación front-end se comunique correctamente con el servidor para manejar el inicio de sesión, el registro y la sesión del usuario.

## Opcional - Ejecutar BackEnd

### `npm run dev` <=== en la terminal del proyecto back

En el back-end, los datos de usuario (como el nombre de usuario, la contraseña y los favoritos) se almacenan localmente en un archivo JSON. Esta implementación permite que la selección de favoritos hecha en el front-end se persista de manera efectiva. El back-end está desarrollado en Node.js utilizando un modelo MVC simplificado. Esta aproximación se eligió para completar el proyecto en un plazo de menos de tres días.

En cuanto a la autenticación, aunque de manera temporal y no recomendada, los tokens se almacenan en el estado global y en sessionStorage durante las pruebas. Sin embargo, la sesión del usuario se mantiene principalmente mediante cookies, lo que permite la interacción continua con el back-end.

Actualmente, el consumo de la API de Marvel enfrenta varias dificultades, principalmente relacionadas con problemas de tiempo de espera (timeouts). Para mitigar estos problemas, se ha optado por utilizar TanstackQuery. Esta herramienta ayuda a gestionar el almacenamiento en caché de manera eficiente y asegura que, en la medida de lo posible, se reutilicen las respuestas obtenidas.

Debido a las limitaciones de tiempo durante las pruebas, el manejo de errores en la autenticación no se ha desarrollado de manera exhaustiva. En su lugar, se ha implementado una solución con un mensaje genérico cuando no se pudo cumplir la petición.

Para los propósitos de prueba, se ha creado un usuario de prueba en la base de datos local que se utiliza en los tests del proyecto. Este usuario tiene las siguientes credenciales: {username: pepe, password: 123456}.

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
