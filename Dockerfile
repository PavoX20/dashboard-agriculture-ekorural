# Usar la última versión de Node.js 17
FROM node:17-slim

# Crear y establecer el directorio de trabajo
RUN mkdir -p /app
WORKDIR /app

# Copiar solo package.json
COPY package.json ./

# Instalar las dependencias del proyecto usando npm
RUN npm install

# Copiar el resto de los archivos del proyecto
COPY . .



# Construir la aplicación
RUN npm run build



# Instalar Nginx
RUN apt-get update && apt-get install -y nginx

# Copiar los archivos construidos a la carpeta de Nginx
RUN cp -r /app/dist/* /usr/share/nginx/html/

# Copiar el archivo de configuración de Nginx
COPY default.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
