// /server.js
const express = require('express');
const cors = require('cors');
const { connectBDD } = require('./database');
const Metadata = require('./models/Metadata');

// Création de l'application Express
const app = express();
app.use(cors());

// Connexion à la base de données
connectBDD();

// Synchronisation de la base de données (création de la table si nécessaire)
Metadata.sync() // force: false => ne supprime pas la table si elle existe déjà
    .then(() => console.log('Table "Metadata" synchronisée avec succès'))
    .catch((err) => console.error('Erreur lors de la synchronisation de la table:', err));

// Route de test
app.get('/', (req, res) => {
    res.send('Hello, serveur est en marche!');
});

// Lancer le serveur
const port = 5000;  // Port d'écoute
app.listen(port, () => {
    console.log(`Serveur lancé sur http://localhost:${port}`);
});
