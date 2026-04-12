const API_URL = 'http://localhost:3000/api';

async function init() {
    try {
        const camisetas = await obtenerCamisetas();
        renderizarProductos(camisetas); 
    } catch (error) {
        console.error("Error al iniciar el catálogo:", error);
    }
}

async function obtenerCamisetas() { 
    const respuesta = await fetch(`${API_URL}/camisetas`); 
    
    if (!respuesta.ok) {
        throw new Error('Error al conectar con el servidor');
    }
    
    return await respuesta.json();
}

function renderizarProductos(productos) {
    const contenedor = document.getElementById('contenedor-productos');
    contenedor.innerHTML = ''; // Limpiamos antes de pintar

    productos.forEach(producto => {
        const tarjeta = crearTarjetaProducto(producto);
        contenedor.appendChild(tarjeta);
    });
}

// --- 3. CREAR LA TARJETA (ARTICLE) ---
function crearTarjetaProducto(producto) {
    const article = document.createElement('article');
    article.classList.add('producto-card');
    
    article.appendChild(crearElementoTexto('h3', producto.nombre));
    article.appendChild(crearImagen(producto));
    article.appendChild(crearElementoTexto('p', producto.descripcion));
    article.appendChild(crearElementoTexto('p', `€${producto.precioBase.toFixed(2)}`));
    
    // Controles de compra
    article.appendChild(crearSelectores(producto));
    article.appendChild(crearBoton(producto));

    return article;
}

// --- 4. FUNCIONES AUXILIARES (Para no pasar de 15 líneas) ---
function crearElementoTexto(etiqueta, texto) {
    const el = document.createElement(etiqueta);
    el.textContent = texto;
    return el;
}

function crearImagen(producto) {
    const img = document.createElement('img');
    const colorInicial = Object.keys(producto.imagenes)[0]; 
    // Recuerda que en tu base de datos pusimos { blanco: 'ruta' }
    img.src = `http://localhost:3000/${producto.imagenes[colorInicial]}`; 
    // Usamos temporalmente una imagen genérica si no has configurado la ruta de imágenes en el servidor
    // img.src = "https://via.placeholder.com/150"; 
    img.alt = producto.nombre;
    return img;
}

function crearSelectores(producto) {
    const div = document.createElement('div');
    // Select Talla
    const selectTalla = document.createElement('select');
    producto.tallas.forEach(t => selectTalla.appendChild(crearElementoTexto('option', t)));
    // Select Color
    const selectColor = document.createElement('select');
    producto.colores.forEach(c => selectColor.appendChild(crearElementoTexto('option', c)));
    // Input Cantidad
    const inputCantidad = document.createElement('input');
    inputCantidad.type = 'number'; inputCantidad.min = '1'; inputCantidad.value = '1';

    div.append(selectTalla, selectColor, inputCantidad);
    return div;
}

function crearBoton(producto) {
    const btn = document.createElement('button');
    btn.textContent = 'Añadir al carrito';
    btn.onclick = () => console.log(`Añadido: ${producto.nombre}`); // Por ahora solo imprime
    return btn;
}

window.onload = init;