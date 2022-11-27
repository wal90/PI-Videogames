import React from "react";
import s from "../styles/paginado.module.css"

export default function Paginado ({videogamesPerPage, allVideogames, paginado}){
    const pageNumbers=[]

    for (let i = 0; i <= Math.floor(allVideogames / videogamesPerPage); i ++){
        pageNumbers.push(i +1)
    }

    return(
        <div className={s.pagination}>
        <nav>
            <ul>
                {pageNumbers &&
                pageNumbers.map(number =>(
                    <li className={s.pa} key={number}>
                        <a  onClick={()=> paginado(number)}>{number}</a>  
                       
                    </li>
                    ))}
            </ul>
        </nav>
        </div>
    )
}