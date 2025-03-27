import React, { useState } from 'react';
import './App.css';
import { Nav } from './components/nav/nav.component.tsx';
import axios from "axios";
import Unknow from "./img/unknown.gif";

// Définir un type pour une carte (image et nom)
interface Card {
  image: string;
  name: string;
}

export default function App() {
  const [boosters, setBoosters] = useState<Card[]>([]);
  const [loading, setLoading] = useState(false);
  const [cardsToDisplay, setCardsToDisplay] = useState<Card[]>([]); // Nouveau state pour contrôler l'affichage des cartes
  const [gifsVisible, setGifsVisible] = useState<boolean>(true); // Contrôle si les GIFs sont visibles

  // Fonction pour récupérer les boosters
  const openBooster = async () => {
    setLoading(true);
    setCardsToDisplay([]); // Réinitialiser les cartes affichées à chaque ouverture
    setGifsVisible(true); // Afficher les GIFs au début
    try {
      const response = await axios.get("http://localhost:5000/boosters"); // Appel à l'API pour récupérer les boosters
      const fetchedBoosters = response.data.map((card: { image: string, name: string }) => ({
        image: card.image,   // Lien IPFS de l'image
        name: card.name      // Nom de la carte
      }));

      setBoosters(fetchedBoosters); // Mettre à jour les boosters

      // Ajouter les cartes une par une avec un délai
      fetchedBoosters.forEach((card, index) => {
        setTimeout(() => {
          setCardsToDisplay((prevCards) => [...prevCards, card]); // Ajouter la carte à afficher
          if (index === fetchedBoosters.length - 1) {
            setGifsVisible(false); // Cacher les GIFs après la dernière carte ajoutée
          }
        }, index * 1000); // Délai de 1 seconde entre chaque carte (index * 1000ms)
      });
    } catch (error) {
      console.error("Erreur lors de l'ouverture du booster");
    } finally {
      setLoading(false); // Arrêt du chargement une fois les données récupérées
    }
  };

  return (
    <div className="App">
      <Nav />
      <div className="main-content">
        <div className="pack">
          <h1>Ouvrir un Pack</h1>
          <div className="pack-opening">
            <div>
              <button onClick={openBooster} disabled={loading}>
                {loading ? 'Ouverture du booster...' : "Ouvrir un Booster"}
              </button>
            </div>
            <div>
              <h2>Rareté des cartes</h2>
            </div>
          </div>
        </div>

        <div className="locked-cards">
          {/* Vérifie si des boosters ont été récupérés */}
          {boosters.length > 0 ? (
            // Afficher d'abord les GIFs si nécessaire
            boosters.map((card, index) => (
              <div key={index} className="card">
                <div className="card-inner">
                  {gifsVisible ? (
                    <img src={Unknow} alt="Face avant" className="front" />
                  ) : (
                    // Remplacer progressivement les GIFs par les images des cartes
                    cardsToDisplay[index] && (
                      <img src={cardsToDisplay[index].image} alt={cardsToDisplay[index].name} className="back" />
                    )
                  )}
                </div>
                {/* N'afficher le nom qu'après que l'image soit remplacée */}
                <p className='cardName'>{cardsToDisplay[index] ? cardsToDisplay[index].name : 'Carte inconnue'}</p>
              </div>
            ))
          ) : (
            <p>Aucune carte disponible pour le moment</p>
          )}
        </div>
      </div>
    </div>
  );
}
