const express = require('express');
const axios = require('axios');
const cors = require('cors');

const { avoirTousLestags, avoirTagsContacts, avoirContacts, avoirContact, avoirContactAvecMail, ajouterContact,
modifierContact, supprimerContact, avoirContacstEntreprises, avoirListeEntreprises, avoirListeEntrepriseParId,
avoirListeEntrepriseParNom, ajouterEntreprise, modifierEntreprise, supprimerEntreprise, avoirContactsEntreprise,
avoirTags, avoirTagsId} = require('./functions');

const { generateAccessToken } = require('./authentication');
const app = express();
const port = process.env.PORT || 3000;

const jwt = require('jsonwebtoken');

app.use(cors());

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connection route
app.post('/login', (req, res) => {
  
  const username = req.body.username;
  const user = { name: username };
  const acccesToken = generateAccessToken(user);
  res.json({acccesToken: acccesToken});
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
    res.json({r});
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

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
