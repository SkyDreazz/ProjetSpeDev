// /server.js
const express = require('express');
const cors = require('cors');

// Création de l'application Express
const app = express();
app.use(cors());

// Route de test
app.get('/', (req, res) => {
    res.send('Hello, serveur est en marche!');
});

// Lancer le serveur
const port = 5000;  // Port d'écoute
app.listen(port, () => {
    console.log(`Serveur lancé sur http://localhost:${port}`);
});
