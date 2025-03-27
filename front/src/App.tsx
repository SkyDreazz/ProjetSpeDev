import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Nav } from './components/nav/nav.component.tsx';
import axios from "axios";

export default function App() {

  const  [cards, setCards] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/cards")
    .then(response => setCards(response.data))
    .catch(error => console.error("Erreur lors de la récupération des cartes : ", error));
  }, []);

  return (
    <div className="App">
      <Nav></Nav>
      <div className="main-content">
        <div className="pack">
          <h1>Ouvrir un Pack</h1>
          <div className='pack-opening'>
            <div>

            </div>
            <div>
              <h2>Rareté des cartes</h2>
            </div>
          </div>
        </div>
        <div className="locked-cards">
        </div>
      </div>
    </div>
  );
}
