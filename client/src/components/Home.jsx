import React from "react";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getVideogames } from '../actions';
import SearchBar from "./SearchBar"; 
import { Link } from "react-router-dom";
import Card from "./Card";
import { Fragment } from "react";
import Paginado from "./Paginado";
import s from "../styles/home.module.css"
import Loading from "./Loading";


import { filterVideogamesByGenres,
filterCreated, 
orderByName
} from "../actions";

export default function Home (){

    const dispatch = useDispatch()
    const allVideogames = useSelector ( (state) => state.videogames)

    const [currentPage, setCurrentPage] = useState(1)
    const [videogamesPerPage, setVideogamesPerPage] = useState(15)
    const [order, setOrden] = useState('')
    const indexOfLastVideogames = currentPage * videogamesPerPage;
    const indexOfFirstVideogame = indexOfLastVideogames - videogamesPerPage;
    const currentVideogames = allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogames)

    const paginado= (pageNumber) =>{
        setCurrentPage(pageNumber)
    }

    useEffect (()=>{
        dispatch(getVideogames());
    },[])

    function handleClick(e){
        e.preventDefault();
        dispatch(getVideogames());
    }
    
    function handleFilterGenres(e){
        e.preventDefault();
        dispatch(filterVideogamesByGenres(e.target.value))
    }

    function handleFilterCreate(e){
        e.preventDefault();
        dispatch(filterCreated(e.target.value))
    }

    function handleSort(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrden(`ordenado ${e.target.value}`)
    }

    return (
        <div className={s.containerHome}>
            <div className={s.nav}>
               <h1>VIDEOGAMES</h1>
            <Link to ='/videogame'  className={s.link}> Create Videogame</Link>
            <SearchBar/>
            <button onClick={e=>{handleClick(e)}}>
            Reload
            </button>
           
            </div>
            <div className={s.sel}>
                <select onChange={e=>handleSort(e)}>
                    <option value ='asc'>A-Z</option>
                    <option value ='desc'>Z-A</option>
                </select>
                <select onChange={e=>handleFilterGenres(e)}> 
                    <option value="All">Todos</option>
                    <option value="Action">Action</option>
                    <option value="Indie">Indie</option>
                    <option value="Adventure">Adventure</option>
                    <option value="RPG">RPG</option>
                    <option value="Strategy">Strategy</option>
                    <option value="Shooter">Shooter</option>
                    <option value="Casual">Casual</option>
                    <option value="Simulation">Simulation</option>
                    <option value="Puzzle">Puzzle</option>
                    <option value="Arcade">Arcade</option>
                    <option value="Platformer">Platformer</option>
                    <option value="Racing">Racing</option>
                    <option value="Massively Multiplayer">Massively Multiplayer</option>
                    <option value="Sports">Sports</option>
                    <option value="Fighting">Fighting</option>
                    <option value="Family">Family</option>
                    <option value="Board Games">Board Games</option>
                    <option value="Educational">Educational</option>
                    <option value="Card">Card</option>        
                </select>

                <select onChange={e=>handleFilterCreate(e)}>
                    <option value="All">Todos</option>
                    <option value="Existentes">Existentes</option>
                    <option value="Creados">Creados</option>
                </select>
           
            </div>
            {allVideogames.length?
            <div>
               <div className={s.pag}>
               <Paginado
                videogamesPerPage={videogamesPerPage}
                allVideogames={allVideogames.length}
                paginado={paginado}
                />  
            </div>
           

                <div className={s.allCards}>
                    {
                    currentVideogames?.map( (c)=>{
                        return ( <Fragment>
                            <Link to={"/videogames/" + c.id}>
                            <Card name={c.name} image={c.image} genres={c.genres} rating={c.rating} key={c.id}/> 
                            </Link>
                           
                        </Fragment>)
                     })
                }
                </div> 
            </div> : <div>
                <Loading></Loading>
            </div>
            
              
              


}
        </div>
    )



}