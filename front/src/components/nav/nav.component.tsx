import React from 'react';
import "./nav.css";
import User from "../../img/icons/user.png"
import { useLocation } from "react-router";


export function Nav(){

    let loc = useLocation();

    console.log(loc)

    return (
        <div className='nav'>
            <a href="#" className='link'>Accueil</a>
            <a href="#" className='link'>Packs</a>
            <a href="#" className='link'>Mes cartes</a>
            <a href="#" className='link'>Aide</a>
            <a href="#"><img src={User} alt="" /></a>
        </div>
    )
}