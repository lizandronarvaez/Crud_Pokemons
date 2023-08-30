<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar el repositorio
2. Ejecutar
   ```
   yarn install
   ```
3. Tener Nest CLI instalado
   ```
   npm install -g @nest/cli
   ```
4. Tener instalado Docker

5. Levantar la base de datos

   **-d significa modo 2º plano**
   ```
   docker compose up -d
   ```
6. Configuracion variables de entorno

   **Clonar el archivo env.template y renombrarlo a .env**

7. Establecer valores de datos para las varibles en el archivo `.env`

   ```
   MONGODB=MONGODB
   PORT=PORT
   ```

8. Realizar inserccion de datos en la BD con la siguiente URL:
   ```
   http://localhost:3000/api/v2/seed
   ```

# Stack Usado

- MongoDB
- Nestjs
