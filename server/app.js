const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');

const functions = require('./functions');

const {
  avoirTousLestags,
  avoirTagsContacts,
  avoirContacts,
  avoirContact,
  avoirContactAvecMail,
  ajouterContact,
  modifierContact,
  supprimerContact,
  avoirContacstEntreprises,
  avoirListeEntreprises,
  avoirListeEntrepriseParId,
  avoirListeEntrepriseParNom,
  ajouterEntreprise,
  modifierEntreprise,
  supprimerEntreprise,
  avoirContactsEntreprise,
  avoirTags,
  avoirTagsId,
  insererCSVligne
} = functions;

const { generateAccessToken, ajouterUtilisateur, supprimerUtilisateur, avoirUtilisateurs, modifierUtilisateur, avoirUtilisateur } = require('./users');
const app = express();
const port = 3002;

const jwt = require('jsonwebtoken');

app.use(cors());

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Avoir la liste des utilisateurs
app.get('/api/users', async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
  })
  await avoirUtilisateurs().then((r) => {
    res.json(r);
  });
});

// Avoir un utilisateur par son ID
app.get('/api/users/:id', async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
  })
  await avoirUtilisateur(`${req.params.id}`).then((r) => {
    res.json(r);
  });
});

//Ajouter un utilisateur
app.put('/api/users/add/', async (req, res) => {
  const {
    nom,
    prenom,
    email,
    role,
    pwd
  } = req.body;

  const saltRounds = 10;

  bcrypt.hash(pwd, saltRounds).then(async function(hash) {
    // Store hash in your password DB.
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403)
    })
    await ajouterUtilisateur(nom, prenom, email, role, hash).then((r) => {
      res.json(r);
    });
  });
});

// Supprimer un utilisateur
app.delete('/api/users/del/:id', async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
  })
  await supprimerUtilisateur(`${req.params.id}`).then((r) => {
    res.json(r);
  });
});

// Modifier un utilisateur
app.patch('/api/users/mod/:id/', async (req, res) => {
  

  const {
    email,
    role,
    pwd,
  } = req.body;

  const saltRounds = 10;

  bcrypt.hash(pwd, saltRounds).then(async function(hash) {
    // Store hash in your password DB.
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403)
    })
    await modifierUtilisateur(email, role, hash, `${req.params.id}`).then((r) => {
      res.json(r);
    });
  });

});

// Route pour se connecter
app.post('/login', async (req, res) => {
  
  const email = req.body.email;
  const password = req.body.password;

  await generateAccessToken(email, password).then((token) => {
    res.json(token);
  });

});


app.get('/api/contacts/tags',   async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
  })
  await avoirTousLestags().then((r) => {
    res.json(r);
  });
});

app.get('/api/contacts/:id/tags',   async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
  })
  await avoirTagsContacts(`${req.params.id}`).then((r) => {
    res.json(r);
  });
});

app.get('/api/contacts',   async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
  })
  await avoirContacts().then((r) => {
    res.json(r);
  });
});

// Récupérer un contact par son ID
app.get('/api/contacts/:id',   async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
  })
  await avoirContact(`${req.params.id}`).then((r) => {
    res.json(r);
  });
});

// Récupérer un contact par son email
app.get('/api/contacts/mail/:email',   async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
  })
  await avoirContactAvecMail(`${req.params.email}`).then((r) => {
    res.json(r);
  });
});

//ajouter contact
app.put('/api/contacts/add/',   async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
  })
  const {
    ID_ENTREPRISE,
    MAIL,
    MOBILE,
    NOM,
    PRENOM,
    DESCRIPTION,
    RH
  } = req.body;
  await ajouterContact(ID_ENTREPRISE, MAIL, MOBILE, NOM, PRENOM, DESCRIPTION, RH).then((r) => {
    res.json(r);
  });
});

//modifier contact
app.patch('/api/contacts/mod/:id/',   async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
  })
  const {
    ID_ENTREPRISE,
    MAIL,
    MOBILE,
    NOM,
    PRENOM,
    DESCRIPTION,
    RH
  } = req.body;
  await modifierContact(ID_ENTREPRISE, MAIL, MOBILE, NOM, PRENOM, DESCRIPTION, RH, `${req.params.id}`).then((r) => {
    res.json({message:"contact modifié"});
  });
});

//supprimer contact
app.delete('/api/contacts/del/:id', async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
  })
  await supprimerContact(`${req.params.id}`).then((r) => {
    res.json({message:"contact supprimé"});
  });
});

// affiche la liste des contacts avec leur entreprise associée
app.get('/api/contactsentreprises', async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
  })
  await avoirContacstEntreprises().then((r) => {
    res.json({r});
  });
});

// avoir la liste des entreprises
app.get('/api/entreprises', async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
  })
  await avoirListeEntreprises().then((r) => {
    res.json(r);
  });
});

// avoir une entreprise par id
app.get('/api/entreprises/:id', async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
  })
  await avoirListeEntrepriseParId(`${req.params.id}`).then((r) => {
    res.json({r});
  });
});

// avoir une entreprise par nom
app.get('/api/entreprises/nom/:nom', async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
  })
  await avoirListeEntrepriseParNom(`${req.params.nom}`).then((r) => {
    res.json({r});
  });
});

//ajouter une entreprise
app.put('/api/entreprises/add/',   async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
  })
  const {
    NOM,
    IMAGE
  } = req.body;
  await ajouterEntreprise(NOM, IMAGE).then((r) => {
    res.json(r);
  });
});

//modifier une entreprise
app.patch('/api/entreprises/mod/:id/',   async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
  })
  const {
    NOM,
    IMAGE,
  } = req.body;

  await modifierEntreprise(NOM, IMAGE, `${req.params.id}`).then((r) => {
    res.json(r);
  });
});

//supprimer une entreprise
app.delete('/api/entreprises/del/:id', async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
  })

  await supprimerEntreprise(`${req.params.id}`).then((r) => {
    res.json(r);
  });
});

// avoir les contacts d'une entreprise
app.get('/api/entreprises/:id/contacts',   async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
  })

  await avoirContactsEntreprise(`${req.params.id}`).then((r) => {
    res.json(r);
  });
});

// avoir les tags
app.get('/api/tags',   async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
  })

  await avoirTags().then((r) => {
    res.json(r);
  });
});

// avoir les tags par id
app.get('/api/tags/:id',   async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
  })

  await avoirTagsId(`${req.params.id}`).then((r) => {
    res.json(r);
  });
});

app.put('/api/insererCSVligne',   async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
  })

  const info = req.body; 
  // {
  //   nom,
  //   prenom,
  //   entreprise,
  //   email,
  //   mobile, 
  //   description,
  ///   forumStage,
  ///   jobDating,
  //   TA,
  ///   ConseilPerf,
  ///   Tuteur,
  ///   Vacataire,
  ///   MatineeInnov,
  //   RH
  // }

  await insererCSVligne(info).then((r) => {
    res.json(r);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on http://185.212.227.8:${port}`);
});
