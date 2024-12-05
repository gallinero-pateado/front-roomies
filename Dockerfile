# Etapa de construcción
FROM node:18 AS build

# Configura el directorio de trabajo
WORKDIR /app

# Copia los archivos del proyecto
COPY package.json package-lock.json ./
RUN npm install

# Copia el resto de los archivos del proyecto
COPY . .

# Construye la aplicación
RUN npm run build

# Etapa de producción con Nginx
FROM nginx:alpine

# Copia los archivos estáticos generados al directorio de Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copia el archivo nginx.conf personalizado
COPY nginx.conf /etc/nginx/nginx.conf

# Expone el puerto 80
EXPOSE 80

# Comando por defecto para arrancar nginx
CMD ["nginx", "-g", "daemon off;"]
