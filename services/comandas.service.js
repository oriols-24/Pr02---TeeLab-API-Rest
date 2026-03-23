const { obtenerCamisetaPorId } = require('./catalogo.service');

// Memoria para guardar comandas 
let comandasGuardadas = [];
let contadorComandas = 1;

const validarEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validarComanda = (datos) => {
    const { cliente, items } = datos;
    const errores = [];

    if (!cliente || !cliente.nombre || cliente.nombre.length < 2) errores.push("Nombre de cliente inválido (mínimo 2 caracteres)."); 
    if (!cliente || !cliente.email || !validarEmail(cliente.email)) errores.push("Email de cliente inválido."); 
    if (!items || !Array.isArray(items) || items.length === 0) {
        errores.push("El pedido debe contener al menos un item."); 
        return errores; 
    }

    items.forEach((item, index) => {
        if (!item.cantidad || item.cantidad < 1) errores.push(`Item ${index}: La cantidad debe ser >= 1.`); 
        
        const camiseta = obtenerCamisetaPorId(item.camisetaId);
        if (!camiseta) {
            errores.push(`Item ${index}: La camiseta con ID ${item.camisetaId} no existe.`); 
        } else {
            if (!camiseta.tallas.includes(item.talla)) errores.push(`Item ${index}: Talla ${item.talla} no disponible para ${camiseta.nombre}.`); 
            if (!camiseta.colores.includes(item.color)) errores.push(`Item ${index}: Color ${item.color} no disponible para ${camiseta.nombre}.`); 
        }
    });

    return errores;
};

const crearComanda = (datos) => {
    const { items } = datos;
    let totalPedido = 0; 

    // Construir items del ticket
    const itemsTicket = items.map(item => {
        const camiseta = obtenerCamisetaPorId(item.camisetaId);
        const subtotal = camiseta.precioBase * item.cantidad; 
        totalPedido += subtotal;

        return {
            camisetaId: item.camisetaId,
            nombre: camiseta.nombre, 
            talla: item.talla,
            color: item.color,
            cantidad: item.cantidad,
            precioUnitario: camiseta.precioBase, 
            subtotal: subtotal 
        };
    });

    // Generar ID formato ORD-0001 
    const idComanda = `ORD-${String(contadorComandas).padStart(4, '0')}`;
    contadorComandas++;

    const nuevaComanda = {
        id: idComanda, 
        fecha: new Date().toISOString(), 
        estado: "recibida", 
        cliente: datos.cliente,
        direccion: datos.direccion,
        items: itemsTicket, 
        total: totalPedido 
    };

    comandasGuardadas.push(nuevaComanda); 
    return nuevaComanda;
};

const obtenerTodas = () => comandasGuardadas;
const obtenerPorId = (id) => comandasGuardadas.find(c => c.id === id);

module.exports = { validarComanda, crearComanda, obtenerTodas, obtenerPorId };