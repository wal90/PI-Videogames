import React from "react";
import s from '../styles/cardContain.module.css'

export default function Card({ image, name, genres, rating}){
    return (
        <div className={s.contain}>
            <div className={s.contain2} >
                <div className={s.rating}>
                    <h5>{rating}</h5>
                </div> 
           <div className={s.containImg}>
                <img src={image} alt="" width="100%" height="100%"/>
            </div> 
            <div className={s.text}> 
                <h3>{name[0].toUpperCase() + name.slice(1)}</h3>
               
                   <div>
                     <p>{genres.map(e => e.name ).join(", ")}</p>    

                </div>
         
                
                
            </div> 
            </div>
        </div>
    );
}