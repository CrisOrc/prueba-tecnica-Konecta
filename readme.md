# 🚀 Proyecto Full Stack con Docker

Este proyecto contiene una aplicación **Full Stack** desarrollada con **React (Vite) para el frontend**, **Node.js con Express para el backend** y **PostgreSQL como base de datos**. Todo el entorno está **dockerizado** para facilitar su despliegue y ejecución.

---

## 📌 **Requisitos de Instalación**

Antes de ejecutar el proyecto, asegúrate de tener instalado en tu sistema:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

Para verificar que están correctamente instalados, ejecuta:

```sh
# Verificar Docker
docker --version

# Verificar Docker Compose
docker-compose --version
```

---

## 📌 **Pasos de Instalación y Ejecución**

Sigue estos pasos para instalar y ejecutar la aplicación:

### 🔹 **1. Clonar el repositorio**

```sh
git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio
```

### 🔹 **2. Construir y levantar los servicios con Docker**

```sh
docker-compose build
docker-compose up -d
```

Esto iniciará los siguientes servicios:

- **Frontend:** Disponible en [http://localhost:3000](http://localhost:3000)
- **Backend:** Disponible en [http://localhost:5000](http://localhost:5000)
- **Base de Datos PostgreSQL:** Disponible en `localhost:5432`

### 🔹 **3. Verificar que los contenedores estén corriendo**

```sh
docker ps
```

Si necesitas detener los servicios:

```sh
docker-compose down
```

---

## 📌 **Estructura del Proyecto**

```
.
├── backend-app   # Aplicación backend con Node.js y Express
├── frontend-app  # Aplicación frontend con React y Vite
├── docker-compose.yml  # Orquestación de los servicios con Docker
├── .dockerignore  # Archivos ignorados en Docker
└── README.md  # Documentación del proyecto
```

---

## 📌 **Mejores Prácticas**

### 🔹 **1. Dockerización Modular**

Cada servicio tiene su propio `Dockerfile`, lo que permite:

- Independencia entre el frontend, backend y base de datos.
- Facilidad de despliegue en entornos de producción y desarrollo.

### 🔹 **2. Seguridad en el Backend**

- Uso de **JWT (JSON Web Token)** para autenticación segura.
- Configuración de **CORS** para restringir accesos.
- **Prisma ORM** para evitar **inyecciones SQL**.

### 🔹 **3. Eficiencia en el Frontend**

- Uso de **Vite** para una carga rápida.
- Implementación de **Lazy Loading** en rutas.
- Manejo de estado con **Redux Toolkit**.

### 🔹 **4. Base de Datos Escalable**

- PostgreSQL como base de datos principal.
- Volumen persistente en Docker para evitar pérdida de datos.

---

## 📌 **Seguridad**

### 🔹 **1. Variables de Entorno**

Se usa `.env` para manejar credenciales sensibles, asegurando que no se suban al repositorio.
Ejemplo de `.env`:

```
DATABASE_URL=postgresql://user:password@postgres:5432/dbname
JWT_SECRET=tu_secreto_seguro
```

### 🔹 **2. Protección contra ataques comunes**

- **Rate Limiting** para evitar fuerza bruta en el login.
- **Helmet** para establecer encabezados HTTP seguros.
- **Escaped Inputs** para prevenir **XSS y CSRF**.
