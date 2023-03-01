
//  const getApiInfo= async () =>{
//     const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=26f5694668424436baf7cfbd6ca4948e&addRecipeInformation=true&number=100`);
//     // console.log(apiUrl.data.results)
//     const apiToDb = await Recipe.findAll()
//         !apiToDb.length && 
//             await Recipe.bulkCreate(apiUrl.data.results.map( r =>{
//                 return{
//                     // id: idCreator(),
//                     // id: r.id,
//                     name: r.title,
//                     summary: r.summary,
//                     healthScore: r.healthScore,
//                     steps: r.analyzedInstructions.map(a=> a.steps.map(s=>s.step).join(' - ')),
//                     image: r.image 
//                 }}
//             ))
        
//         return apiToDb
    
//  }


//  const getDbInfo = async ()=>{
//     return await Recipe.findAll({
//         include:{
//             model:  Diet,
//             attributes: ['diets'],
//             through:{
//                 atributes:[]
//             }
//         }
//     }) 
// }

// const getDbInfo = async (name) => {
//     return await Recipe.findAll({
//         where: {
//             name : {
//                 [Op.iLike]: "%" + name +"%"
//             }
//         },
//         attributes: ["name"],
//         include: [
//             {
//                 model: Diet,
//                 attributes: ["name"],
//                 through: {
//                     attributes: []
//                 }
//             }
//         ]       
//     });
// };



// const getDbInfo = async (name)=>{
//     return await Videogame.findAll({
//         where: {
//          name : {
//          [Op.iLike]: "%" + name +"%"
//             }
//     },
//     attributes: ["name"],
//         include: [
//          {
//          model: Genre,
//             attributes: ["name"],
//             through: {
//             attributes: []
//             }
//          }
//         ]       
//     });
// };



// const getById = async (id)=>{
    
//     const urlById = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`) 
//     if(!urlById) throw "No existe la receta";

//     // const urlById = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=26f5694668424436baf7cfbd6ca4948e&addRecipeInformation=true&number=100`)
//     const apiDetail = await urlById.data
//     return{               
//         name: apiDetail.title,
//         type:apiDetail.dishTypes,
//         summary: apiDetail.summary.replace(/(<([^>]+)>)/gi, ""),
//         healthScore: apiDetail.healthScore,
//         steps: apiDetail.analyzedInstructions.map(a=> a.steps.map(s=>s.step).join(' - ')),
//         image: apiDetail.image,
//         diet: apiDetail.diets
//     }


// }



//////////////////////////////////////////////////////////////////////////////




// const getAllEpisodes = async() =>{
//     const apiUrle= await  axios.get(`https://rickandmortyapi.com/api/episode`);
//     const apiInfo = await apiUrle.data.results.map(e => {
//         return{
//             name: e.name,
//            }
//     })
//    apiInfo.forEach(e=> {
//     Episode.findOrCreate({
//         where:{
//             name: e.name
//         }
//     })
    
//    });
//     return await Episode.findAll()
// }



            // dataDiets.forEach(e => {
            //     Diet.findOrCreate({
            //       where: { name: e },
            //       defaults: { id: idCreator(true), name : e }
            // })
            
            // const typeDB = await Diet.findAll()
            

// }

// router.post("/", async (req, res, next) => {
//     const { name, dificulty, season, countries } = req.body
//     try {     //1 posicion, true || false
//         const [actCreated, boolCreate] = await Activity.findOrCreate({
//             // distractorin const obj{name:nestor, age:32}   const {name, age } = obj ||      const arr ["nestor", true]
//             //                                                                           const [primero, bulean] = arr
//             where: {
//                 name: name //si existe una actividad con el nombre especificado
//             },
//             defaults: { id: idCreator(true), name, dificulty: parseInt(dificulty) , season } //create

//         })
//         console.log(actCreated.dataValues.id)
//         if (!actCreated) throw "No se pudo crear la actividad"
//         else {
//             countries.map(async (e) => {
//                 const countFind = await Country.findOne({
//                     where: { name: e }
//                 })
//                 countFind.addActivity(actCreated.dataValues.id)
//             })
//             boolCreate ? res.send("Actividad creada y asociada.") : res.send("Actividad asociada")
//         }
//     } catch (error) { 
//         next(error)}
// })


//////////////////////////////////////////////////////////////////////////////////////



// router.post('/', async (req, res, next)=>{
//         const { id, name,summary, healthScore, steps, diet, createdInDb} = req.body
//     try {
        
//         if(!name || !summary) res.status(400).json({msg : 'Faltan datos'});

//         const recipeCreate = await Recipe.create({
//              id, name, summary, healthScore , steps, createdInDb });
//         const dietDb = await Diet.findAll({
//             where:{name: diet}
//         })
//         recipeCreate.addDiet(dietDb)
//         res.status(201).send('Creado con éxito')
//       } catch (error) {
//         next(error)
//       }
// })

///////////////////////////////////////////////////////////////






// const getDbId = async (id)=>{
//     const recipeDb = await Recipe.findByPk(id,{
//         include:{
//             model: Diet,
//             attributes: ['name'],
//             through:{
//                 atributes:[]
//             }
//         }
//     }) 
//     return recipeDb
// }

// const getAllById = async (id) =>{
//     if(id.length < 10){
//         const apiInfo = await getById(id);
//         return apiInfo;
//     } else{
//         const dbInfo = await getDbId(id);
//         return dbInfo;
//     }


// }


// const getApiById = async (id) => {
//     const apiByIdUrl = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
//     if(!apiByIdUrl) throw "No existe la receta";
//     return {
    
//         id: apiByIdUrl.id,
//         name: apiByIdUrl.title,
//         type:apiByIdUrl.dishTypes,
//         //summary: apiByIdUrl.summary.replace(/(<([^>]+)>)/gi, ""),
//         healthScore: apiByIdUrl.healthScore,
//         //steps: apiByIdUrl.analyzedInstructions.map(a=> a.steps.map(s=>s.step).join(' - ')),
//         image: apiByIdUrl.image,
//         diet: apiByIdUrl.diets
//           }
    
    
// };

// const getDbById = async (id) => {
//     return await Recipe.findByPk(id, {
//         include: [
//             {
//                 model: Diet,
//                 attributes: ["name"],
//                 through: {
//                     attributes: []
//                 }
//             }
//         ]
//     });
// };

// const getRecipeById = async (id) => {
//     if(id.length < 10){
//         const apiInfo = await getApiById(id);
//         return apiInfo;
//     } else{
//         const dbInfo = await getDbById(id);
//         return dbInfo;
//     }
// };







const searchByIdAtApi = async(id)=>{
    
    const recipe = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`) 
    const detail = recipe.data
    return {
        id: detail.id,
        name: detail.title,
        type:detail.dishTypes,
        summary: detail.summary.replace(/(<([^>]+)>)/gi, ""),
        healthScore: detail.healthScore,
        steps: detail.analyzedInstructions.map(a=> a.steps.map(s=>s.step).join(' - ')),
        image: detail.image,
        diet: detail.diets
    }


}

const searchByIdAtDB = async (id) => {

    const recipe = await Recipe.findByPk(id, {
        include: {
            model: Diet,
            attributes: ["name"],
            through: {
                attributes: []
            } //ver si la sintaxis esta bien escrita
        }
     })
    return recipe

}



// const getRecipeById = async (id) => {
//     if(id.length < 10){
//         const apiInfo = await searchByIdAtApi(id);
//         console.log(apiInfo)
//         return apiInfo;
//     } else{
//         const dbInfo = await searchByIdAtDB(id);
//         console.log(dbInfo)
//         return dbInfo;
//     }
// };

const searchById = async(id)=>{
const apiRecipeProm = await searchByIdAtApi(id)
const dbRecipeProm = await searchByIdAtDB(id)

const [AllRecipe, dbRecipe] = await Promise.all([apiRecipeProm, dbRecipeProm])

return AllRecipe || dbRecipe
}









