const catalogoService = require('../services/catalogo.service');

const getCamisetas = (req, res, next) => {
    try {
        const camisetas = catalogoService.obtenerCamisetas(req.query);
        res.status(200).json(camisetas); 
    } catch (error) {
        if (error.message === 'BAD_SORT') {
            return res.status(400).json({ error: "Parámetro de ordenación 'sort' no válido." }); 
        }
        next(error);
    }
};

const getCamisetaById = (req, res) => {
    const camiseta = catalogoService.obtenerCamisetaPorId(req.params.id);
    if (!camiseta) {
        return res.status(404).json({ error: "Camiseta no encontrada" }); 
    }
    res.status(200).json(camiseta); 
};

module.exports = { getCamisetas, getCamisetaById };