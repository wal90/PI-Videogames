require('dotenv').config();
const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios')
const { Videogame, Genre, videogame_genre} = require('../db.js')
const { API_KEY  } = process.env;

const router = Router();


 const getApiInfo= async () =>{
    const apiUrl = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
    
    const apiInfo = await apiUrl.data.results.map(game =>{
        return {
            id: game.id,
            name: game.name,
            description: game.description_raw,
            released: game.released,
            rating: game.rating,
            platforms: game.platforms.map(p=> p.platform.name),
            image: game.background_image,
            genres: game.genres. map (g=> g.name)
        }
        
    })
   
   return apiInfo;

 }

 const getApiInfoNext= async ()=>{

    const apiInfoNext=[]
     
    for (let i = 2; i < 6; i++) {
            const apiNextUrl = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`);
            apiInfoNext.push(
                await   apiNextUrl.data.results.map(game=>{
                return{
                    id: game.id,
                    name: game.name,
                    description: game.description_raw,
                    released: game.released,
                    rating: game.rating,
                    platforms: game.platforms.map(p=> p.platform.name),
                    image: game.background_image,
                    genres: game.genres. map (g=> g.name)
                }
            })
            
           )}
            return apiInfoNext;
    }

const getAllApiInfo = async()=>{
    const apiInfo = await getApiInfo()
    const nextApiInfo = await getApiInfoNext()
    const allApiInfo= apiInfo.concat(nextApiInfo[0])
                            .concat(nextApiInfo[1])
                            .concat(nextApiInfo[2])
                            .concat(nextApiInfo[3])
    return allApiInfo
}



const getDbInfo = async ()=>{
    return await Videogame.findAll({
        include:{
            model: Genre,
            attributes: ['name'],
            through:{
                atributes:[]
            }
        }
    }) 
}

const getAllVideogames = async () =>{
    const apiInfo = await getAllApiInfo()
    const dbInfo = await getDbInfo()
    const infoTotal = apiInfo.concat(dbInfo)
    return infoTotal
}





router.get('/videogames', async (req, res)=>{
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
router.get('/videogames/:id', async (req, res)=>{
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

router.post('/videogame', async (req, res)=>{
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

router.get('/genres',  async (req, res)=>{
 
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
