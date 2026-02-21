# Dashboard Agriculture — EkoRural (Frontend)

## Descripción

Dashboard de monitoreo agrícola para EkoRural. Aplicación SPA construida con React 18, TypeScript y Vite que visualiza en tiempo real datos de sensores desplegados en invernaderos y cultivos de hongos. Se comunica con un backend REST que a su vez consume datos de un broker MQTT, y presenta la información mediante gráficas interactivas (Chart.js) y componentes de UI (Ant Design / Bootstrap).

## Arquitectura

```
┌────────────┐       HTTP/JSON        ┌─────────────┐      MQTT       ┌──────────────┐
│  React App │  ───── (axios) ──────► │  Backend API │  ◄──────────►  │  Broker MQTT │
│  (Vite)    │  GET /endpoint         │  REST        │                │  (Sensores)  │
└────────────┘                        └─────────────┘                └──────────────┘
```

- **React → Backend**: El frontend consume la API REST mediante `axios`. Cada módulo (`invernadero1`, `invernadero3`, `mushrooms`, `general`, `sidebar`) contiene su propio directorio `fetchData/` con funciones asíncronas que realizan peticiones `GET` al backend y retornan los datos para renderizar gráficas y tarjetas.
- **Backend → MQTT**: El broker MQTT publica datos de sensores. El backend se suscribe a los tópicos, procesa y persiste la información, y la expone al frontend a través de endpoints REST. **Este proyecto no conecta directamente al broker**; solo consume los datos ya procesados por el backend.

## Prerrequisitos

| Herramienta | Versión exacta | Instalación                                                                    |
| ----------- | -------------- | ------------------------------------------------------------------------------ |
| **Node.js** | `v16.20.2`     | [nvm](https://github.com/nvm-sh/nvm): `nvm install 16.20.2 && nvm use 16.20.2` |
| **pnpm**    | `>=7.x`        | `npm install -g pnpm`                                                          |

## Variables de Entorno

> **Nota**: Actualmente las URLs del backend están hardcodeadas en los módulos `fetchData/fetchData.ts` de cada componente. No se utiliza un archivo `.env` con variables `VITE_*`. La siguiente tabla documenta las URLs que el frontend consume y que deben coincidir con la configuración del backend:

| URL hardcodeada         | Módulos que la usan                                    | Descripción                            |
| ----------------------- | ------------------------------------------------------ | -------------------------------------- |
| `http://localhost:5001` | `invernadero1`, `invernadero3`, `mushrooms`, `general` | Backend principal (puerto Docker)      |
| `http://localhost:3000` | `general`, `siderbar`                                  | Backend alternativo / desarrollo local |

Para modificar la URL del backend, editar la constante `url` dentro de cada archivo `fetchData.ts` correspondiente.

## Instalación y Ejecución

```bash
# 1. Clonar el repositorio
git clone <url-del-repositorio>
cd dashboard-agriculture-ekorural

# 2. Usar la versión correcta de Node
nvm use 16.20.2

# 3. Instalar dependencias
pnpm install

# 4. Iniciar en modo desarrollo (http://localhost:5173/dashboard)
pnpm run dev

# 5. Build de producción
pnpm run build

# 6. Preview del build de producción
pnpm run preview
```

### Servidor de Desarrollo

Vite está configurado para escuchar en todas las interfaces de red (`0.0.0.0`) en el puerto `5173`, con polling habilitado para compatibilidad con Docker.

| Comando            | Descripción                                |
| ------------------ | ------------------------------------------ |
| `pnpm run dev`     | Servidor de desarrollo con HMR             |
| `pnpm run build`   | Compilación TypeScript + bundle producción |
| `pnpm run preview` | Sirve el build de producción localmente    |
| `pnpm run lint`    | Ejecuta ESLint sobre archivos `.ts`/`.tsx` |
