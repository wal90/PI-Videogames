import React from 'react';
import {Link} from 'react-router-dom';
import s from '../styles/landingPage.module.css'



export default function LandingPage(){
    return (
        <div className={s.container}>
        <div className={s.contain}>
            <div className={s.text}>
            <p><strong> WELCOME TO </strong></p>
            
            <h1>VIDEOGAMES</h1>
       

            <div className={s.btn}>
               <Link to='/home'>
                <button >LET'S GO!</button>
            </Link>  
            </div>
           
            </div>
        </div>
        </div>
    )
}