import React, { useEffect, useState } from 'react';
import axios from "axios";
import "./cards.css";
import { Nav } from '../../components/nav/nav.component.tsx';

export function Cards(){

    const  [cards, setCards] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/cards")
        .then(response => setCards(response.data))
        .catch(error => console.error("Erreur lors de la récupération des cartes : ", error));
    }, []);

    return (
        <div className='cards'>
            <Nav></Nav>
            <div className='main-content'>
                {cards.map((link, index) => (
                    <img key={index} src={link} alt="" />
                ))}
            </div>
        </div>
    )
}