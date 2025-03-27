// /server.js
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

require('dotenv').config();

// Création de l'application Express
const app = express();
app.use(cors());
app.use(express.json());

// Route de test
app.get('/', (req, res) => {
    res.send('Hello, serveur est en marche!');
});

//route pour récupérer les cartes
app.get('/cards', async (req, res) => {
    try  {
        const cards = await prisma.card.findMany({
            select: {image: true},
        });
        res.json(cards.map(card => card.image));
    } catch (err) {
        console.log("Erreur lors de la récupération des cartes : ", err);
        res.status(500).json({err: "Erreur Serveur"});
    }
});

app.get("/boosters", async (req, res) => {
    try{
        const randomCards = [];

    // Générer 5 numéros aléatoires entre 1 et 2222
        while (randomCards.length < 5) {
            const randomId = Math.floor(Math.random() * 2222) + 1; // ID aléatoire entre 1 et 2222
            if (!randomCards.includes(randomId)) {
                randomCards.push(randomId);
            }
        }

    // Récupérer les cartes avec ces IDs aléatoires depuis la base de données
        const cards = await prisma.card.findMany({
            where: {
                id: {
                    in: randomCards, // Filtrer par les IDs générés
                },
            },
        });
        console.log("Cartes envoyées : ", cards)
        res.json(cards);

    } catch (err) {
        console.error("Erreur lors de l'ouvertur du pack : ", error);
        res.status(500).json({error: "Erreur interne"});
    }
})

// Lancer le serveur
const port = 5000;  // Port d'écoute
app.listen(port, () => {
    console.log(`Serveur lancé sur http://localhost:${port}`);
});
