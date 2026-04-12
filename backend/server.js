const express = require('express');
const cors = require('cors'); 

const camisetasRoutes = require('./routes/catalogo.routes');
const comandasRoutes = require('./routes/comandas.route');

const app = express();
const PORT = 3000;

// Middlewares obligatorios
app.use(cors()); 
app.use(express.json()); 

// Rutas
app.use('/api/camisetas', camisetasRoutes);
app.use('/api/comandas', comandasRoutes);

// Middleware final de manejo de errores 
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo ha ido mal en el servidor.' });
});

// Arranque del servidor
app.listen(PORT, () => {
    console.log(`Servidor TeeLab API corriendo en http://localhost:${PORT}`);
});


if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Servidor TeeLab API corriendo en http://localhost:${PORT}`);
    });
}

module.exports = app;