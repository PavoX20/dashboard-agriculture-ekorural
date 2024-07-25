# React + TypeScript + Vite

Este proyecto proporciona una configuración mínima para que React funcione con Vite, con HMR (Hot Module Replacement) y algunas reglas de ESLint.

Actualmente, hay dos complementos oficiales disponibles:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) usa [Babel](https://babeljs.io/) para Fast Refresh.
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) usa [SWC](https://swc.rs/) para Fast Refresh.

## Configuración de ESLint

Si estás desarrollando una aplicación de producción, se recomienda actualizar la configuración para habilitar reglas de lint conscientes de tipos:

- Configura la propiedad `parserOptions` de nivel superior de esta manera:

\`\`\`js
export default {
  // otras reglas...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
\`\`\`

- Reemplaza \`plugin:@typescript-eslint/recommended\` con \`plugin:@typescript-eslint/recommended-type-checked\` o \`plugin:@typescript-eslint/strict-type-checked\`.
- Opcionalmente, agrega \`plugin:@typescript-eslint/stylistic-type-checked\`.
- Instala [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) y agrega \`plugin:react/recommended\` y \`plugin:react/jsx-runtime\` a la lista \`extends\`.

## Versiones y Requisitos

- **Node.js**: Asegúrate de usar la última versión de Node.js disponible en este momento. Puedes descargarla desde [aquí](https://nodejs.org/).

## Cómo Correr la Aplicación

Para correr la aplicación, sigue estos pasos:

1. Clona el repositorio:
   \`\`\`sh
   git clone <URL_DEL_REPOSITORIO>
   \`\`\`
2. Navega al directorio del proyecto:
   \`\`\`sh
   cd nombre-del-proyecto
   \`\`\`
3. Instala las dependencias:
   \`\`\`sh
   npm install
   \`\`\`
4. Corre la aplicación en modo desarrollo:
   \`\`\`sh
   npm run dev
   \`\`\`
5. Abre tu navegador y navega a \`http://localhost:3000\`.

## URLs y Conexión con Backend en Docker

Las URLs de esta aplicación están configuradas para conectarse a un backend en una red de Docker. Si necesitas conectarte a otra API, deberás editar las URLs en la configuración del proyecto y posiblemente el código también.

### Ejemplo de Configuración de URLs

\`\`\`js
// Archivo de configuración o código donde se definen las URLs
const API_URL = process.env.API_URL || 'http://backend-container-name:port';
\`\`\`

Asegúrate de que los nombres de los contenedores y los puertos sean correctos y que todos los contenedores estén en la misma red de Docker.

## Información Adicional

Para obtener más información sobre cómo configurar y usar Vite con React y TypeScript, consulta la [documentación oficial de Vite](https://vitejs.dev/).

# dashboard-agriculture-ekorural