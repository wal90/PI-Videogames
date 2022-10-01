import React from "react";

export default function Card({ image, name, genres }){
    return (
        <div>
            <h3>{name}</h3>
            <h5>{genres}</h5>
            <img src={image} alt="" width="20%" height="20%"/>
        </div>
    );
}