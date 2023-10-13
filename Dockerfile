# Usa la imagen base de Node.js
FROM node:16-bullseye

# Establece el directorio de trabajo en la imagen
WORKDIR /app/api

# Copia los archivos de tu aplicación
#COPY .env .env
COPY . .

# Instala cualquier dependencia de tu aplicación
COPY package*.json ./
RUN npm install

# Expone el puerto en el que se ejecuta tu aplicación Node.js
EXPOSE 9000

# Define el comando para iniciar tu aplicación
CMD ["npm", "start"]