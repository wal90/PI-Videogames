import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import { useEffect } from "react";
import s from "../styles/detail.module.css"
import Loading from "./Loading";

export default function Detail (props){
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getDetail(props.match.params.id))
    }, [dispatch])


    
    const myVideogame = useSelector((state)=> state.detail)

    return(
        <div>
           
            {
                myVideogame.hasOwnProperty("name") ?
                // <div>
                //     <h1>{myVideogame.name}</h1>
                //     <h5>{myVideogame.released}</h5>

                // </div> : <p>Loading...</p>

<div className={s.containD} key={myVideogame.id}>
<div className={s.containImage}>
    <img src={myVideogame.image} alt="File Not Found" width="100%" />
</div>

<div className={s.details} key={myVideogame.id}>
    <h1>{myVideogame.name}</h1>
<div className={s.data}>
   <div className={s.dataOne} >
         <p><strong>· Released </strong>{myVideogame.released}</p>
         <div><strong>· Platforms </strong>{myVideogame.platforms?.map(e => <div key={e}>{e + " "}</div>)}</div>
      </div> 

    <div className={s.dataTwo}>
         <p><strong>· Rating </strong>{myVideogame.rating}</p>
        { !myVideogame.createdInDb? <div><strong>· Genres </strong>{myVideogame.genres?.map(e => <div key={e}>{e + " "}</div>)}</div> :
        <div><strong>· Genres </strong>{myVideogame.genres?.map(e => <div key={e}>{e.name + " "}</div>)}</div>}
        
        
    </div>

</div>
   
    <div className={s.des} >
        <strong>· DESCRIPTION </strong><p> {myVideogame.description}</p>
    </div> 
    
</div>


                 <div>
                    <Link to='/home' className={s.link}>
                    <button>Back</button>
                    </Link>
                </div>
                </div>
                : <Loading></Loading>

             } 
           
        </div>
    )
}