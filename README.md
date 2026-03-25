# Pr02---TeeLab-API-Rest

## Cómo arrancar el proyecto

1. **Instalar dependencias:**
   Abre la terminal en la carpeta del proyecto y ejecuta:
   npm i
   

2. **Arrancar el servidor en modo desarrollo:**
   Ejecuta el siguiente comando para levantar el servidor:
   npm run dev
   
   *La API estará disponible en `http://localhost:3000`.*

3. **Ejecutar los tests:**
   Para pasar las pruebas automatizadas (Jest + Supertest), utiliza:
   npm test

---

## Lista de Endpoints

### Catálogo de Camisetas

* **Listar todas las camisetas**
    * **Método:** `GET`
    * **Ruta:** `/api/camisetas` 
    * **Query Params (opcionales):** Permite filtrar por `talla`, `color`, `tag`, `q` (búsqueda de texto) y `sort` (`precio_asc`, `precio_desc`, `nombre_asc`, `nombre_desc`) .

* **Obtener detalle de una camiseta**
    * **Método:** `GET`
    * **Ruta:** `/api/camisetas/:id` 
    * **Respuesta:** Devuelve el objeto de la camiseta o un error `404` si no existe.

### Comandas 

* **Crear una nueva comanda**
    * **Método:** `POST`
    * **Ruta:** `/api/comandas` 
    * **Body (JSON):** Debe incluir `cliente` (nombre, email), `direccion` y un array de `items` (con `camisetaId`, `talla`, `color` y `cantidad`).
    * **Respuesta:** Devuelve `201` con el ticket generado (incluye subtotales, total e ID de comanda) o `400` si hay errores de validación.

* **Listar todas las comandas**
    * **Método:** `GET`
    * **Ruta:** `/api/comandas` 
    * **Respuesta:** Devuelve un array con todas las comandas guardadas en memoria.

* **Obtener detalle de una comanda**
    * **Método:** `GET`
    * **Ruta:** `/api/comandas/:id` 
    * **Respuesta:** Devuelve el ticket completo de la comanda o error `404` si no se encuentra.