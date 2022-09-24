require('dotenv').config();
const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getAllVideogames } = require('../controllers')

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
    const {id} = req.params

//    if(id.includes('-')){
//      try {
//          const gameId = await Videogame.findByPk(id,{include:Genre})
//          const genreId={
//             id:gameId.id,
//             name: gameId.name,
//             description: gameId.description_raw,
//             released: gameId.released,
//             rating: gameId.rating,
//             platforms: gameId.platforms.map(p=> p.platform.name),
//             image: gameId.background_image,
            
//          }
//         res.json(genreId)
//       } catch (error) {
//        return res.status(404).json({error: `No se encontró el videogame con id: ${id}`})
//     }
// } else{
//     try {
//        const gameApi= await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);

//        const idInfo = await gameApi.data.results.map(game =>{
//         return {
//             name: game.name,
//             description: game.description_raw,
//             released: game.released,
//             rating: game.rating,
//             platforms: game.platforms.map(p=> p.platform.name),
//             image: game.background_image,
//             genres: game.genres. map (g=> g.name)
//         }
//     })
//        res.json(idInfo)

//     } catch (error) {
//         return res.status(404).json({error: `No se encontró el videogame con id: ${id}`})
//     }
// }


    const videogamesTotal = await getAllVideogames()
    if(id){
        let videogameId = await videogamesTotal.filter( (v)=> v.id == id)
        videogameId.length ?
        res.status(200).json(videogameId):
        res.status(404).send('No se encontro el Videogame')

    }
})




module.exports = router;