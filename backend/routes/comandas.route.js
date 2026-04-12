const express = require('express');
const router = express.Router();
const comandasController = require('../controllers/comandas.controller');

router.post('/', comandasController.postComanda); 
router.get('/', comandasController.getComandas); 
router.get('/:id', comandasController.getComandaById); 
module.exports = router;