
const initialState = {
    videogames : [],
    allVideogames : [],
    genres :[],
    detail : [],
}

function rootReducer (state = initialState, action){
        switch (action.type){
            case 'GET_VIDEOGAMES':
                return {
                    ...state,
                    videogames: action.payload,
                    allVideogames:action.payload,
                }

            case 'POST_VIDEOGAME':
                return {
                    ...state
                }

            case 'GET_GENRES':
                return {
                    ...state,
                    genres: action.payload
                }

            case 'GET_NAME_VIDEOGAMES':
                return {
                    ...state,
                    videogames: action.payload
                }

            case 'FILTER_BY_GENRE':
                const allVideogames = state.allVideogames;
                const genreFiltered = action.payload === "All" ? allVideogames : 
                allVideogames.filter(e=>e.genres.find(e=> e.name == action.payload))
                if(genreFiltered.length === 0) {
                    alert("El genero no pertenece a ningun juego");
                }
                return {
                    ...state,
                    videogames: genreFiltered,
                }

            case 'FILTER_CREATED':
                const allVideogamesc= state.allVideogames
                const createdFilter = action.payload === 'Creados' ? allVideogamesc.filter((el )=> el.createdInDb) : allVideogamesc.filter((el)=> !el.createdInDb)
                return{
                    ...state,
                    videogames:action.payload === "All" ? state.allVideogames: createdFilter
                }

            case 'ORDER_BY_NAME':
                let sortedArr = action.payload === 'asc' ?
                    state.videogames.sort(function(a,b){
                        if(a.name > b.name){
                            return 1
                        }
                        if(b.name > a.name){
                            return -1
                        }
                        return 0
                    }) :
                    state.videogames.sort(function(a,b){
                        if(a.name > b.name){
                            return -1
                        }
                        if(b.name > a.name){
                            return 1
                        }
                            return 0
                    })
                    return {
                        ...state,
                        videogames: sortedArr
                    }

             case 'ORDER_BY_RATING':
                let sortedRan = action.payload === 'less' ?
                    state.videogames.sort(function(a,b){
                        if(a.rating > b.rating){
                            return 1
                        }
                        if(b.rating > a.rating){
                            return -1
                        }
                            return 0
                        }) :
                    state.videogames.sort(function(a,b){
                        if(a.rating > b.rating){
                            return -1
                        }
                        if(b.rating > a.rating){
                            return 1
                        }
                            return 0
                        })
                        return {
                        ...state,
                        videogames: sortedRan
                            }       

            case 'GET_DETAILS':
                return {
                    ...state,
                    detail:action.payload
                }
            

                default:
                    return state
        }
}

export default rootReducer;