const API_URL = 'http://localhost:3000/api';

async function initTicket() {
    const orderId = localStorage.getItem('teelab_ultimo_pedido');
    if (!orderId) return mostrarError('No hay pedidos recientes.');
    
    try {
        const ticket = await obtenerTicketDeAPI(orderId);
        pintarTicketPagina(ticket);
    } catch (error) {
        mostrarError('Error al recuperar el ticket del servidor.');
    }
}

async function obtenerTicketDeAPI(id) {
    const respuesta = await fetch(`${API_URL}/comandas/${id}`);
    if (!respuesta.ok) throw new Error('Ticket no encontrado');
    return await respuesta.json();
}

function pintarTicketPagina(ticket) {
    const contenedor = document.getElementById('contenedor-ticket');
    
    let html = `<h2>ID Pedido: ${ticket.id}</h2>`;
    html += `<p><strong>Fecha:</strong> ${new Date(ticket.fecha).toLocaleString()}</p>`;
    html += `<p><strong>Estado:</strong> ${ticket.estado.toUpperCase()}</p>`;
    html += `<h3>Líneas de pedido:</h3><ul>`;
    
    ticket.items.forEach(item => {
        html += `<li>${item.cantidad}x ${item.nombre} [${item.talla}-${item.color}] - €${item.subtotal.toFixed(2)}</li>`;
    });
    
    html += `</ul><h3 class="total-ticket">TOTAL: €${ticket.total.toFixed(2)}</h3>`;
    contenedor.innerHTML = html;
}

function mostrarError(mensaje) {
    document.getElementById('contenedor-ticket').innerHTML = `<p>${mensaje}</p>`;
}

window.onload = initTicket;