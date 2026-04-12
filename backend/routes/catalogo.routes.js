const express = require('express');
const router = express.Router();
const catalogoController = require('../controllers/catalogo.controller');

router.get('/', catalogoController.getCamisetas); 
router.get('/:id', catalogoController.getCamisetaById); 

module.exports = router;