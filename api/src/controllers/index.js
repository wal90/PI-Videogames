require('dotenv').config();
const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios')
const { Videogame, Genre} = require('../db')
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



module.exports = {
    getApiInfo,
    getApiInfoNext,
    getAllApiInfo,
    getDbInfo,
    getAllVideogames
}