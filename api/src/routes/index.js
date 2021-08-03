const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const gamesRoute = require('./Videogame')
const genreRoute = require('./Genre')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/', gamesRoute)
router.use('/', genreRoute)


module.exports = router;
