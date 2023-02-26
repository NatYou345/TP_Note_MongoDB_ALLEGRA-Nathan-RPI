// J'appelle le package express grâce à require
const express = require('express');
/*
  Je déclare une variable app pour application
  j'y affecte le résultat de la fonction express
  cela me eprmet de créer un serveur node express
*/
let app = express();
/*
  Je récupère l'adresse de ma BdD MONGO sur mongo atlas
  en cliquant sur connect puis connect your application
  je choisi nodejs dans la liste déroulante puis la version 
  4.1 ou plus
*/
const mongoose = require('mongoose');
const uri = 'mongodb+srv://nathanallegra:NatYou192023@natyouland.rcmnkh9.mongodb.net/test';
let promise = mongoose.connect(uri, {useNewUrlParser: true});

promise.then((db) => {
  // J'indique que ma BdD est connecté
  console.log('Succesfully connected to the Database !');
  // Mon application va écouter les événements sur le port 3000
  app.listen(3000, () => {
    // A l'ouverture du servur je mets ce message d'accueil
    console.log('Listening on port 3000 !');
  });
})

app.use('/pages', express.static('./client/pages'));
app.use('/assets', express.static('./client/assets'));
app.use(require('express').json());

// Quand mon application est sollicitée à la racine ....
app.get('/', (req, res) => {
  // ... je lui envoie le fichier index.html à afficher
  res.sendFile(__dirname + '/client/index.html');
  // __dirname permet d'obtenir automatiquement l'arborescence
  // du dossier courant
});

const Student = require('./Model/student_model');
app.post('/students', (req, res) => {
  /*
    Je créé un nouveau film respectant
    le schéma défini dans mon modèle
    lors de la requête il est contenu dans req.body
  */
  let newStudent = new Student(req.body);
  /*
    j'utilise mon nouveua film respectant le model
    et la méthode save pour sauvegarder
  */
  newStudent.save((err, ob) => {
    /*
      La fonction save a 2 paramètres
      le premier enregistr les erreurs eventuelles
      le second contient l'objet sauvegardé
    */
    if(err) {
      // Si erreur je l'affiche et j'envoie
      // l'info au client
      console.log(err);
      return res.send(500);
    }
    // Dans le cas contraire j'envoie le status 200
    // pour indiquer que tout s'est bien déroulé
    res.sendStatus(200);
  });
});

app.get('/students', (req, res) => {
  Student.find({}, (err, obj) => {
    if(err) {
      console.log(err);
      return res.send(500);
    }
    return res.send(obj);
  });
});

// Le :id sera autimatiquement transofrmé par l'identifiant
// envoyé par fetch
app.get('/students/:id', (req, res) => {
  // Pour effectuer une recherche on va utiliser le modèle
  // BodyParser permet de conserver l'id dans req.params.id
  Student.findOne({_id: req.params.id}, (err, obj) => {
    if(err) {
      console.log(err);
      return res.send(500);
    }

    return res.send(obj);
  })
});

app.put('/students/:id', (req, res) => {
  Student.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}, (err, obj) => {
    if(err) {
      console.log(err);
      return res.send(500);
    }

    return res.send(obj);
  });
});

app.delete('/students/:id', (req, res) => {
  Student.deleteOne({_id: req.params.id}, (err, obj) => {
    if(err) {
      console.log(err);
      return res.send(500);
    }
    res.sendStatus(200);
  });
});
