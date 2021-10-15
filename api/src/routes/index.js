const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const gamesRoute = require('./Videogame')
const genreRoute = require('./Genre')
const platformRouter = require('./Plarforms')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/games', gamesRoute)
router.use('/genre', genreRoute)
router.use('/platforms', platformRouter)


module.exports = router;
