const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

// Route de base
app.get('/', (req, res) => {
    res.send('Bienvenue sur mon serveur Express !');
});

// Écoute du serveur sur le port spécifié
app.listen(port, () => {
    console.log(`Serveur en cours d'écoute sur le port ${port}`);
});
