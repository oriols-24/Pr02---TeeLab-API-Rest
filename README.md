# TeeLab FullStack - Práctica 3

Aplicación web Full Stack para la gestión y compra en la micro-tienda de camisetas TeeLab. Este proyecto separa la lógica del servidor (API REST) y la interfaz de usuario (Frontend), comunicándose de forma asíncrona.

## Estructura del Proyecto

El proyecto está dividido en dos directorios principales:

* `/backend`: Contiene la API REST construida con Node.js y Express (Práctica 2).
* `/frontend`: Contiene la interfaz de usuario construida con HTML, CSS y Vanilla JavaScript puro.

## Cómo ejecutar el proyecto

Para que la aplicación funcione correctamente, es necesario arrancar tanto el servidor como el cliente.

### 1. Levantar el Backend (API REST)
Abre un terminal, navega a la carpeta del backend y arranca el servidor:
\`\`\`bash
cd backend
npm install
npm run dev
\`\`\`
*El servidor estará escuchando en `http://localhost:3000` con CORS habilitado.*

### 2. Levantar el Frontend (Cliente)
Abre la carpeta `/frontend` en tu editor de código (ej. VS Code) y lanza el archivo `index.html` utilizando la extensión **Live Server**.
*Esto abrirá la aplicación en tu navegador (normalmente en el puerto 5500).*

## Funcionalidades implementadas

* **Catálogo dinámico:** Carga asíncrona de los productos desde la API mediante `fetch`.
* **Filtros de búsqueda:** Filtrado por texto, talla, color y ordenación, delegando la lógica al backend mediante *Query Params*.
* **Carrito persistente:** Gestión del estado del carrito utilizando `localStorage`. Permite añadir productos con opciones específicas y no se pierde al recargar la página.
* **Proceso de compra:** Envío de la comanda (pedido) al servidor y vaciado automático del carrito al confirmar.
* **Generación de Tickets:** Recuperación y visualización de los detalles de la compra en una página dedicada (`ticket.html`) consultando el endpoint específico de la API.

## Tecnologías utilizadas

* **Frontend:** HTML5, CSS3, JavaScript (ES6+), Fetch API, WebStorage.
* **Backend:** Node.js, Express, CORS.