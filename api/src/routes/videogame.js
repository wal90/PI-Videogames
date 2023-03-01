require('dotenv').config();
const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const { Videogame, Genre} = require('../db.js')
const { API_KEY  } = process.env;

const router = Router();



router.post('/', async (req, res)=>{
    const { id, name, released,description, rating, platforms, image, genres,createdInDb} = req.body

  if(!name || !description ) res.status(400).json({msg : 'Faltan datos'});
  try {
    const gameCreate = await Videogame.create({
       id, name, description,released , rating, platforms, image,createdInDb
    });
    const genreDb =await Genre.findAll({
        where:{name: genres}
    })
    gameCreate.addGenre(genreDb)
    res.json('Videogame creado con éxito')
  } catch (error) {
    res.send(error)
  }
})



module.exports = router;