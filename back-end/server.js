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
})

// Lancer le serveur
const port = 5000;  // Port d'écoute
app.listen(port, () => {
    console.log(`Serveur lancé sur http://localhost:${port}`);
});
