require('dotenv').config();
const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios')
const { Videogame, Genre} = require('../db.js')
const { API_KEY  } = process.env;

const router = Router();



router.post('/', async (req, res)=>{
    const { name, released,description, rating, platforms, image, genres,createdInDb} = req.body

  if(!name || !description || !platforms) res.status(400).json({msg : 'Faltan datos'});
  try {
    const gameCreate = await Videogame.create({
        name, description,released , rating, platforms, image,createdInDb
    });
    const genreDb =await Genre.findAll({
        where:{name: Genre}
    })
    gameCreate.addGenre(genreDb)
    res.send('Videogame creado con éxito')
  } catch (error) {
    res.send(error)
  }
})



module.exports = router;