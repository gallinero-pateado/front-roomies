# Utilizamos una imagen de Node para la construcción
FROM node:18 AS build

# Establecemos el directorio de trabajo
WORKDIR /app

# Copiamos los archivos del proyecto
COPY package*.json ./

# Instalamos dependencias
RUN npm install

# Copiamos el resto de los archivos
COPY . .

# Construimos la aplicación
RUN npm run build

# Utilizamos una imagen ligera para servir el frontend
FROM nginx:alpine

# Copiamos el build al directorio de nginx
COPY --from=build /app/build /usr/share/nginx/html

# Exponemos el puerto 80
EXPOSE 80

# Iniciamos nginx
CMD ["nginx", "-g", "daemon off;"]
