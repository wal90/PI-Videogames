import React ,{useState, useEffect}from "react";
import { Link, useHistory } from "react-router-dom";
import { postVideogame, getGenres} from "../actions"
import { useDispatch, useSelector } from "react-redux";

function validate(input){
    let errors={};
    if(!input.name){
        errors.name = 'Se requiere un nombre';
    } else if(!input.description){
        errors.description = 'Se requiere una descripción'
    }
    return errors;
};

export default function VideogameCreate(){
    const dispatch = useDispatch()
    const history = useHistory()
    const genres = useSelector((state)=> state.genres)
    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        name:"",
        description:"",
        released: "",
        rating: "",
        plataforms:[],
        genres: []
    })

    useEffect(()=>{
        dispatch(getGenres());
    },[]);

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
    }

    function handleCheck(e){
        if(e.target.checked){
            setInput({
                ...input,
                status: e.target.value
            })
        }
    }

   

    function handleSubmit(e){
        e.preventDefault();
        dispatch(postVideogame(input))
        alert('Videojuego creado con éxito')
        setInput({
            name:"",
            description:"",
            released: "",
            rating: "",
            plataforms:[],
            genres: []
        })
        history.push('/home')
    }

    function handleSelect(e){
        setInput({
            ...input,
            genres: [...input.genres, e.target.value]
        })
    }

    function handleDelete(el){
        setInput({
            ...input,
            genres: input.genres.filter(gen => gen !== el)
        })
    }

    return (
        <div>

            <Link to='/home'><button>Volver</button></Link>
            <h1>Creá tu propio videojuego</h1>

            <form onSubmit={(e)=>handleSubmit(e)}>
                <div>
                    <label>Nombre: </label>
                    <input 
                    type="text"
                    value={input.name}
                    name= 'name'
                    onChange={(e)=>handleChange(e)} 
                     />
                </div>

                <div>
                    <label>Descripción: </label>
                    <input 
                    type="text"
                    value={input.description}
                    name= 'description'
                    onChange={(e)=>handleChange(e)} 
                     />
                </div>

                <div>
                    <label>Fecha de lanzamiento: </label>
                    <input 
                    type="text"
                    value={input.released}
                    name= 'released'
                    onChange={(e)=>handleChange(e)} 
                     />
                </div>

                <div>
                    <label>Rating: </label>
                    <input 
                    type="number"
                    value={input.rating}
                    name= 'rating'
                    onChange={(e)=>handleChange(e)} 
                     />
                </div>

                <label >Seleccionar género</label>
                
                <select OnChange ={(e)=>handleSelect(e)}>
                {genres.map((genre) => (
                <option value={genre.name}>{genre.name}</option>
              ))} 
 
                </select>
 <ul><li>{input.genres.map(el=>el + " ,")}</li></ul>
              

                <button type='submit'>Crear Videogame</button>

                {input.genres.map(el=>
                    <div>
                        <p>{el}</p>
                        <button onClick={()=>handleDelete(el)}>X</button>
                    </div>
                    )}

            </form>

      
        </div>
    )
}