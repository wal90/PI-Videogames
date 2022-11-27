require('dotenv').config();
const { Router } = require('express');


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getAllVideogames, getDbId, getVideogameId} = require('../controllers')
const { API_KEY  } = process.env;

const router = Router();



router.get('/', async (req, res)=>{
    const name = req.query.name
    let videogamesTotal = await getAllVideogames()
    if(name){
        let gameName = await  videogamesTotal.filter(v=> v.name.toLowerCase().includes(name.toLocaleLowerCase()))
        gameName.length ?
        res.status(200).json(gameName) :
        res.status(404).send('No se ha encontrado el Videogame');
    } else{
        res.status(200).send(videogamesTotal)
    }
})


//obtener por id


router.get('/:id', async (req, res)=>{

    try {
        const { id } = req.params
        const regex = /([a-zA-Z]+([0-9]+[a-zA-Z]+)+)/;
        if(regex.test(id)){
            const gameId = await getDbId(id)
            return res.json(gameId)
        } else{
            const gameApi= await getVideogameId(id)
           return  res.json(gameApi)
        }
    } catch (error) {
        res.status(400).send({error: "Id not found" })
    }


  

   
//     const videogamesTotal = await getAllVideogames()
//     if(id){
//         let videogameId = await videogamesTotal.filter( (v)=> v.id == id)
//         videogameId.length ?
//         res.status(200).json(videogameId):
//         

//     }
 })




module.exports = router;