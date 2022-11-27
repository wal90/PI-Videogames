import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameVideogames } from "../actions";
import s from "../styles/searchBar.module.css"

export default function SearchBar(){
    const dispatch = useDispatch()
    const [name, setName] = useState('')

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
      
        // e.target.reset()
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getNameVideogames(name))
    }

    return(
        <div>
            <input
            type='text'
            placeholder='   Search videogame...'
            onChange={(e)=>handleInputChange(e)}
            />
            <button type='submit' onClick={(e)=> handleSubmit(e)}>Search</button>
        </div>
    )
}