import React ,{useState, useEffect}from "react";
import { Link, useHistory } from "react-router-dom";
import { postVideogame, getGenres} from "../actions"
import { useDispatch, useSelector } from "react-redux";
import s from "../styles/gameCreate.module.css"

export function validate(input){
    let errors={};
    if(!input.name){
        errors.name = 'Se requiere un nombre';
    } else if(!input.description){
        errors.description = 'Se requiere una descripción'
    }
    if(!input.image) {
        errors.image = 'Image is required'
        } else if (!input.image.includes('https://')){
           errors.image= 'Image is invalid'
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
        rating: 0,
        image:"",
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

    // function handleCheck(e){
    //     if(e.target.checked){
    //         setInput({
    //             ...input,
    //             status: e.target.value
    //         })
    //     }
    // }

   

    function handleSubmit(e){
        e.preventDefault();
        dispatch(postVideogame(input))
        alert('Videogame created')
        setInput({
            name:"",
            description:"",
            released: "",
            rating: "",
            image:"",
            plataforms:[],
            genres: []
        })
        history.push('/home')
    }

  

    function handleSelect(e){
        if(input.genres.includes(e.target.value)){
            alert("The videogame already has that genre");
        } else{
            if (input.genres.length < 4) {
              setInput({
                ...input,
                genres: [...input.genres, e.target.value],
            });
            } else {
              alert("Choose only four genres, please");
            }
        } 
    }


    function handleDelete(el){
        setInput({
            ...input,
            genres: input.genres.filter(gen => gen !== el)
        })
    }


 

    return (
    <div className={s.containerCreate}>
        <div className={s.container}>
           

            

                
            
            
       

        <div className={s.formTotal}>
            <Link to='/home' className={s.link}><button>Back</button></Link>

        <div className={s.formulario}>
        <div >
                    <h2>Create your videogame</h2>
                </div>

            <form onSubmit={(e)=>handleSubmit(e)}>
                <div className={s.sInput}>
                    <label>Name:</label>
                    <input 
                    type="text"
                    value={input.name}
                    name= 'name'
                    onChange={(e)=>handleChange(e)} 
                     />
                     {errors.name &&(
                        <p className={s.error}>{errors.name}</p>
                    )}

                </div>

                <div className={s.sInput}>
                     <label>Description:</label>
                    <input 
                    type="text"
                    value={input.description}
                    name= 'description'
                    onChange={(e)=>handleChange(e)} 
                     />
                   
                    
                </div>

                <div className={s.sInput}>
                    <label>Released: </label>
                    <input 
                    type="date"
                    value={input.released}
                    name= 'released'
                    onChange={(e)=>handleChange(e)} 
                 />
                
                </div>

                <div className={s.sInput}>
                    <label>Rating: </label>
                    <input 
                    type="range"
                    value={input.rating}
                    min="0"
                     max="5" 
                     step="0.1"
                    name= 'rating'
                    onChange={(e)=>handleChange(e)} 
                     />
                    {errors.rating ?(
                        <p className={s.error}>{errors.rating}</p> 
                      ) :  <p className={s.data}>{input.rating}</p>}
                </div>

                <div className={s.sInput}>
                    <label>Image: </label>
                    <input 
                    type="text"
                    value={input.image}
                    name= 'image'
                    onChange={(e)=>handleChange(e)} 
                     />
                      {errors.image &&(
                        <p className={s.error}>{errors.image}</p>
                    )}
                </div>

                <div className={s.sInput}>
                    <label>Select Genres </label>
                    <select onChange ={(e)=>handleSelect(e)}>
                     
                        {genres.map((g) => (
                         <option key={g.name} value={g.name}>{g.name}</option>
                         ))} 
                     </select>
                     
                     {input.genres.map(el =>
                        <div className={s.type}>
                            <p>{el}</p> <button type="button" onClick={()=>handleDelete(el)}>x</button> 
                        </div>  
                      )}
            </div>

               
                <div className={s.create}>
                     <button type='submit'>Videogame created</button>
                </div>
               

              


            </form>
            </div>
            </div>
            </div>
        </div>
    )
}