// app.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware pour analyser les requêtes JSON
app.use(bodyParser.json());

// Connexion à la base de données MongoDB
mongoose.connect('mongodb://localhost:27017/books', {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(() => {
    console.log('Connecté à la base de données MongoDB');
}).catch(err => {
    console.error('Erreur de connexion à la base de données :', err);
    process.exit(1);
});

// Schéma et modèle MongoDB pour les livres
const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
});

const Book = mongoose.model('Book', bookSchema);

// Routes pour l'API REST

app.get('/books', async (req, res) => {
    try {
      const books=await Book.find().exec();
      res.json(books)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



app.get('/books/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Livre non trouvé' });
        res.json(book);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/books',
    async (req, res) => {
        const {title, author} = req.body;
        if (!title || !author) {
            return res.status(400).json({message: 'Titre et auteur sont requis'});
        }

        const newBook = new Book({title, author});

        try {
            const savedBook = await newBook.save();
            res.status(201).json(savedBook);
        }
        catch
            (err) {
            res.status(400).json({message: err.message});

      
            (er)
            {
                res.status(500).json({message: er.message});
            }

        }
    });

app.put('/books/:id', async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBook) return res.status(404).json({ message: 'Livre non trouvé' });
        res.json(updatedBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.delete('/books/:id', async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndRemove(req.params.id);
        if (!deletedBook) return res.status(404).json({ message: 'Livre non trouvé' });
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur en cours d'écoute sur le port ${PORT}`);
});
