const API_URL = 'http://localhost:3000/api';

async function init() {
    try {
        const camisetas = await obtenerCamisetas();
        renderizarProductos(camisetas); 
        document.getElementById('btn-filtrar').addEventListener('click', aplicarFiltros);
        pintarCarrito();
        document.getElementById('btn-finalizar-compra').addEventListener('click', enviarComanda);
    } catch (error) {
        console.error("Error al iniciar el catálogo:", error);
    }
}

async function obtenerCamisetas(queryString = '') { 
    const respuesta = await fetch(`${API_URL}/camisetas${queryString}`); 
    if (!respuesta.ok) throw new Error('Error en la API');
    return await respuesta.json();
}

function renderizarProductos(productos) {
    const contenedor = document.getElementById('contenedor-productos');
    contenedor.innerHTML = ''; 

    productos.forEach(producto => {
        const tarjeta = crearTarjetaProducto(producto);
        contenedor.appendChild(tarjeta);
    });
}

function crearTarjetaProducto(producto) {
    const article = document.createElement('article');
    article.classList.add('producto-card');
    
    article.appendChild(crearElementoTexto('h3', producto.nombre));
    article.appendChild(crearImagen(producto));
    article.appendChild(crearElementoTexto('p', `€${producto.precioBase.toFixed(2)}`));

    const controles = crearSelectores(producto); 
    article.appendChild(controles);
    article.appendChild(crearBoton(producto, controles)); 

    return article;
}

function crearElementoTexto(etiqueta, texto) {
    const el = document.createElement(etiqueta);
    el.textContent = texto;
    return el;
}

function crearImagen(producto) {
    const img = document.createElement('img');
    const colorInicial = Object.keys(producto.imagenes)[0]; 
    
    img.src = producto.imagenes[colorInicial]; 
    
    img.alt = producto.nombre;
    return img;
}

function crearSelectores(producto) {
    const div = document.createElement('div');
    div.classList.add('controles');
    div.innerHTML = `
        <select class="talla">${producto.tallas.map(t => `<option value="${t}">${t}</option>`).join('')}</select>
        <select class="color">${producto.colores.map(c => `<option value="${c}">${c}</option>`).join('')}</select>
        <input type="number" class="cantidad" value="1" min="1">
    `;
    return div;
}

function crearBoton(producto, controlesHTML) {
    const btn = document.createElement('button');
    btn.textContent = 'Añadir al carrito';
    btn.onclick = () => agregarAlCarrito(producto, controlesHTML); 
    return btn;
}

// Funciones para filtros
function construirQueryString() {
    const q = document.getElementById('filtro-texto').value;
    const talla = document.getElementById('filtro-talla').value;
    const color = document.getElementById('filtro-color').value;
    const sort = document.getElementById('filtro-orden').value;

    const params = new URLSearchParams();
    if (q) params.append('q', q);
    if (talla) params.append('talla', talla);
    if (color) params.append('color', color);
    if (sort) params.append('sort', sort);

    const stringFinal = params.toString();
    return stringFinal ? `?${stringFinal}` : '';
}


async function aplicarFiltros() {
    try {
        const queryParams = construirQueryString();
        const camisetasFiltradas = await obtenerCamisetas(queryParams);
        renderizarProductos(camisetasFiltradas);
    } catch (error) {
        console.error("Error al filtrar:", error);
    }
}

// Funciones para el carrito de compras
function obtenerCarrito() {
    const carritoGuardado = localStorage.getItem('teelab_carrito');
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
}

function guardarCarrito(carrito) {
    localStorage.setItem('teelab_carrito', JSON.stringify(carrito));
    pintarCarrito(); 
}

function agregarAlCarrito(producto, controlesHTML) {
    const carrito = obtenerCarrito();
    const talla = controlesHTML.querySelector('.talla').value;
    const color = controlesHTML.querySelector('.color').value;
    const cant = parseInt(controlesHTML.querySelector('.cantidad').value);

    const item = carrito.find(i => i.id === producto.id && i.talla === talla && i.color === color);
    
    if (item) item.cantidad += cant;
    else carrito.push({ camisetaId: producto.id, nombre: producto.nombre, precio: producto.precioBase, talla, color, cantidad: cant });

    guardarCarrito(carrito);
}

function pintarCarrito() {
    const carrito = obtenerCarrito();
    const lista = document.getElementById('lista-carrito');
    lista.innerHTML = '';
    let total = 0;

    carrito.forEach(item => {
        total += item.precio * item.cantidad;
        const li = document.createElement('li');
        li.textContent = `${item.cantidad}x ${item.nombre} [${item.talla}-${item.color}] - €${(item.precio * item.cantidad).toFixed(2)}`;
        lista.appendChild(li);
    });
    
    document.getElementById('total-carrito').textContent = total.toFixed(2);
}


// Funciónes para finalizar compra

async function enviarComanda() {
    const carrito = obtenerCarrito();
    if (carrito.length === 0) return alert("Tu carrito está vacío.");
    const pedido = construirPayloadPedido(carrito); 
    try {
        const respuesta = await fetch(`${API_URL}/comandas`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pedido)
        }); 
        if (!respuesta.ok) throw new Error('Error al procesar el pedido');
        const ticket = await respuesta.json();
        procesarCompraExitosa(ticket);
    } catch (error) {
        console.error("Error:", error);
        alert("Hubo un problema al finalizar la compra.");
    }
}

function construirPayloadPedido(carrito) {
    return {
        cliente: { nombre: "Estudiante TeeLab", email: "alumno@itb.cat" },
        direccion: { calle: "Carrer de Barcelona 404", cp: "08000", ciudad: "Barcelona" },
        items: carrito.map(item => ({
            camisetaId: item.camisetaId,
            talla: item.talla,
            color: item.color,
            cantidad: item.cantidad
        }))
    };
}

function procesarCompraExitosa(ticket) {
    localStorage.removeItem('teelab_carrito');
    pintarCarrito(); 
    localStorage.setItem('teelab_ultimo_pedido', ticket.id);
    window.location.href = 'ticket.html';
}

window.onload = init;