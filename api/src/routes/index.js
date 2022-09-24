require('dotenv').config();
const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const videogamesRoute = require('./videogames.js');
const genresRoute = require('./genres.js')
const videogameRoute = require('./videogame.js')


// const axios = require('axios')
// const { Videogame, Genre} = require('../db.js')
// const { API_KEY  } = process.env;

const router = Router();


router.use('/videogames', videogamesRoute);
router.use('/genres', genresRoute);
router.use('/videogame', videogameRoute)




module.exports = router;
