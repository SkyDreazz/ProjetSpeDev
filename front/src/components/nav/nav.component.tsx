import React from 'react';
import "./nav.css";
import User from "../../img/icons/user.png"
import { useLocation, useNavigate } from "react-router";


export function Nav(){

    const nav = useNavigate();

    let loc = useLocation();

    console.log(loc)

    return (
        <div className='nav'>
            <a onClick={() => nav("/")} className='link'>Accueil</a>
            <a href="#" className='link'>Packs</a>
            <a onClick={() => nav("/cards")} className='link'>Mes cartes</a>
            <a href="#" className='link'>Aide</a>
            <a href="#"><img src={User} alt="" /></a>
        </div>
    )
}