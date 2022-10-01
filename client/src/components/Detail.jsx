import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import { useEffect } from "react";

export default function Detail (props){
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getDetail(props.match.params.id))
    }, [dispatch])


    
    const myVideogame = useSelector((state)=> state.detail)

    return(
        <div>
            {
                myVideogame.length > 0 ?
                // <div>
                //     <h1>{myVideogame.name}</h1>
                //     <h5>{myVideogame.released}</h5>

                // </div> : <p>Loading...</p>

<div key={myVideogame[0].id}>
<img src={myVideogame[0].image} alt="File Not Found" width="300px" hight="300px"/>
<div key={myVideogame[0].id}>
    <h1>{myVideogame[0].name}</h1>
    <p><strong>Fecha de lanzamiento: </strong>{myVideogame[0].released}</p>
    <div ><strong>Rating: </strong><p>{myVideogame[0].rating}</p></div>
    <div><strong>Plataformas: </strong>{myVideogame[0].platforms?.map(e => <div key={e}>{e + " "}</div>)}</div>
    <p><strong>Generos: </strong>{myVideogame[0].genres?.map(e => e ).join(", ")}</p>
    <div><strong>Descripción: </strong><p> {myVideogame[0].description_raw}</p></div>
</div>

</div>
: <p >Loading...</p>







             }   
                <Link to='/home'>
                <button>Volver</button>
                </Link>
           
        </div>
    )
}