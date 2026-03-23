const comandasService = require('../services/comandas.service');

const postComanda = (req, res) => {
    const errores = comandasService.validarComanda(req.body); 
    
    if (errores.length > 0) {
        return res.status(400).json({ errores }); 
    }

    const nuevaComanda = comandasService.crearComanda(req.body);
    res.status(201).json(nuevaComanda); 
};

const getComandas = (req, res) => {
    const comandas = comandasService.obtenerTodas();
    res.status(200).json(comandas); 
};

const getComandaById = (req, res) => {
    const comanda = comandasService.obtenerPorId(req.params.id); 
    if (!comanda) {
        return res.status(404).json({ error: "Comanda no encontrada" }); 
    }
    res.status(200).json(comanda); 
};

module.exports = { postComanda, getComandas, getComandaById };