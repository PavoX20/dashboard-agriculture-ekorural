# Establecer la imagen base de Node.js para la etapa de construcción
FROM node:18 AS build

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos de package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar el resto de los archivos del proyecto
COPY . .

# Construir la aplicación
RUN npm run build

# Establecer la imagen base de Nginx para servir la aplicación
FROM nginx:alpine

# Copiar los archivos construidos desde la etapa de construcción a la carpeta de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar el archivo de configuración del sitio de Nginx
COPY default.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
