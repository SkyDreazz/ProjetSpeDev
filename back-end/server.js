import { PrismaClient } from '@prisma/client';
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import bcrypt from 'bcrypt';
import './passport.js';
import * as auth from './auth.js';
 const prisma = new PrismaClient();
// Création de l'application Express
const app = express();
app.use(cors({
    origin:"*"
}));
app.use(express.json());

// Configuration CORS
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}));

// Configuration de la session
app.use(session({
  secret: 'your-session-secret',
  resave: false,
  saveUninitialized: false
}));

// Initialisation de Passport
app.use(passport.initialize());
app.use(passport.session());


// Route de test
app.get('/', (req, res) => {
  res.send('Hello, serveur est en marche!');
});

// Route d'inscription
app.post('/register', async (req, res) => {
  const {email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(422).json({ error: 'email and password are required' });
    }
    const userExist = await prisma.user.findUnique({ where:{email} })
    if (userExist) {
      return res.status(409).json({ error: 'email already is use' });
    }
    console.log("bonjour")
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({data:{
        email,
        password: hashedPassword
      }});
    if (!newUser){res.status(401).json({error})}
    res.status(201).json({ id: newUser._id, name: newUser.name, email: newUser.email });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong', message: error });
  }
});

// Route de connexion
app.post('/login', async (req, res) => {
  passport.authenticate('local', (error, user, info) => {
    if (error) {
      return res.status(500).json({ error: 'Something went wrong' });
    }
    if (!user) {
      return res.status(401).json(info);
    }
    req.login(user, (error) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: 'Something went wrong' });
      }
      return res.status(200).json({ id: user._id, name: user.name, email: user.email });
    });
  })(req, res);
});

// Route de déconnexion
app.get('/logout', (req, res) => {
  req.logout((error) => {
    if (error) {
      return res.status(500).json({ error: 'Something went wrong' });
    }
    res.status(204).send();
  });
});

// Route utilisateur connecté
app.get('/me', auth.ensureAuthenticated, (req, res) => {
  res.json({ id: req.user._id, name: req.user.name, email: req.user.email });
});

// Suppression du double app.listen
const port = 3000;
app.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
});