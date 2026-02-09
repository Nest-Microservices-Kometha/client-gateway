<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

<h1 align="center">🚀 Client Gateway</h1>

<p align="center">
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/NATS-27AAE1?style=for-the-badge&logo=natsdotio&logoColor=white" alt="NATS" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/status-active-success.svg" alt="Status" />
  <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License" />
</p>

---

## 📖 Descripción

El **Client Gateway** es el punto de comunicación entre nuestros clientes y nuestros servicios. Es el encargado de recibir las peticiones, enviarlas a los servicios correspondientes y devolver la respuesta al cliente.

```
┌─────────────┐       ┌──────────────────┐       ┌─────────────────┐
│   Cliente   │ ───▶  │  Client Gateway  │ ───▶  │  Microservicios │
└─────────────┘       └──────────────────┘       └─────────────────┘
                              │
                              ▼
                      ┌──────────────┐
                      │  NATS Server │
                      └──────────────┘
```

---

## 🛠️ Tecnologías

- **NestJS** - Framework de Node.js para construir aplicaciones escalables
- **TypeScript** - Superset de JavaScript con tipado estático
- **NATS** - Sistema de mensajería para microservicios
- **Docker** - Contenedorización de servicios

---

## 🚀 Dev

### Pasos para levantar el proyecto

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd client-gateway
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Crear archivo de variables de entorno**
   ```bash
   cp .env.template .env
   ```
   > ⚠️ Asegúrate de configurar las variables necesarias en el archivo `.env`

4. **Tener levantados los microservicios** que se van a consumir

5. **Levantar el proyecto**
   ```bash
   npm run start:dev
   ```

---

## 📡 NATS

Para levantar el servidor de NATS con Docker, ejecuta el siguiente comando:

```bash
docker run -d --name nats-server -p 4222:4222 -p 8222:8222 nats
```

| Puerto | Descripción |
|--------|-------------|
| `4222` | Puerto de comunicación de clientes |
| `8222` | Puerto de monitoreo HTTP |

---

## 📂 Estructura del Proyecto

```
src/
├── common/          # Utilidades y código compartido
│   ├── dto/         # DTOs comunes
│   └── exceptions/  # Filtros de excepciones
├── config/          # Configuración de la aplicación
├── orders/          # Módulo de órdenes
│   ├── dto/         # DTOs de órdenes
│   └── enum/        # Enumeradores
└── products/        # Módulo de productos
    └── dto/         # DTOs de productos
```

---

## 📜 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run start` | Inicia la aplicación |
| `npm run start:dev` | Inicia en modo desarrollo (watch) |
| `npm run start:prod` | Inicia en modo producción |
| `npm run build` | Compila el proyecto |
| `npm run test` | Ejecuta los tests |

---

## 📝 Licencia

Este proyecto está bajo la licencia [MIT](LICENSE).

---

<p align="center">
  Hecho con ❤️ usando <a href="https://nestjs.com/">NestJS</a>
</p>
