const catalogo = require('../data/catalogo');

const obtenerCamisetas = (query) => {
    let resultado = [...catalogo];
    const { talla, color, tag, q, sort } = query; 

    // Filtros
    if (talla) resultado = resultado.filter(c => c.tallas.includes(talla)); 
    if (color) resultado = resultado.filter(c => c.colores.includes(color)); 
    if (tag) resultado = resultado.filter(c => c.tags.includes(tag)); 
    if (q) {
        const busqueda = q.toLowerCase();
        resultado = resultado.filter(c => 
            c.nombre.toLowerCase().includes(busqueda) || 
            c.descripcion.toLowerCase().includes(busqueda) 
        );
    }

    // Ordenación
    if (sort) {
        const validSorts = ['precio_asc', 'precio_desc', 'nombre_asc', 'nombre_desc']; 
        if (!validSorts.includes(sort)) throw new Error('BAD_SORT'); 

        resultado.sort((a, b) => {
            if (sort === 'precio_asc') return a.precioBase - b.precioBase;
            if (sort === 'precio_desc') return b.precioBase - a.precioBase;
            if (sort === 'nombre_asc') return a.nombre.localeCompare(b.nombre);
            if (sort === 'nombre_desc') return b.nombre.localeCompare(a.nombre);
        });
    }

    return resultado;
};

const obtenerCamisetaPorId = (id) => {
    return catalogo.find(c => c.id === id); 
};

module.exports = { obtenerCamisetas, obtenerCamisetaPorId };