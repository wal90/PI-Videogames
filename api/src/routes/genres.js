require('dotenv').config();
const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios')
const { Genre } = require('../db.js')
const { API_KEY  } = process.env;

const router = Router();


router.get('/',  async (req, res)=>{
 
        try {
          const urlGenres = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
          const apiGenres = urlGenres.data.results.map((e) => e.name);
          apiGenres.map(g =>
              Genre.findOrCreate({
               where: {
                name: g
              }
            }))
          
              
        const dbGenres = await Genre.findAll();
        res.status(202).json(dbGenres) 
        } catch (error) {
            res.status(404).json( {error:'No se encontro el Género'}  )
        }
    

})





module.exports = router;