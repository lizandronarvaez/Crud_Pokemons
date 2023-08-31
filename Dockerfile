# Instalo la imagen de node y la renombro como dependencias
FROM node:18-alpine3.15 AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
# Trabajo en el directorio app
WORKDIR /app
# copio el package.sjon a la raiz principal de app
COPY package.json yarn.lock ./
# realizo la instalacion de los modulos
RUN yarn install --frozen-lockfile

# BContruye la app con las dependecias ya descargadas y solo las copia 
FROM node:18-alpine3.15 AS builder
WORKDIR /app
# Copia las depdencias de la imagen deps hacia el directorio de la imagen builder 
COPY --from=deps /app/node_modules ./node_modules
# copia todo lo qiue esta en el directorio dockerfile en la raiz principal
COPY . .
# hace el buid de la app
RUN yarn build


# Esta imagen es la que va a hacer funcionar la aplicacion
FROM node:18-alpine3.15 AS runner

# establece el directio de trabajo tambien valdria ponder /app
WORKDIR /usr/src/app
# copia el archivo package.json a la raiz principal
COPY package.json yarn.lock ./
# realizar la instalacion de dependecias de produccion
RUN yarn install --prod
# Desde la imagen builder copia la carpeta dis hacia la imagen nueva runner
COPY --from=builder /app/dist ./dist

# # Copiar el directorio y su contenido
# RUN mkdir -p ./pokedex

# COPY --from=builder ./app/dist/ ./app
# COPY ./.env ./app/.env

# # Dar permiso para ejecutar la applicación
# RUN adduser --disabled-password pokeuser
# RUN chown -R pokeuser:pokeuser ./pokedex
# USER pokeuser

# EXPOSE 3000

CMD [ "node","dist/main" ]