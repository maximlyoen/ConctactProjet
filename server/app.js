const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { fetchDataForAllPersonnes, fetchDataForEntreprise, testQuery, insert} = require('./functions');
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

app.get('/entreprises/:id', async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403)
    })
    const result = await testQuery(`${req.params.id}`).then((result) => {
      console.log(result);
    });
    //entreprise = {"entreprise" : result[0]};
    // console.log(result);
    // return res.json(result);
  
});

app.put('/api/contacts/add/', async (req, res) => {
  try {
    const {
      ID_ENTREPRISE,
      MAIL,
      MOBILE,
      NOM,
      PRENOM,
      DESCRIPTION,
      RH
    } = req.body;
    
    // const conn = await pool.getConnection();
    // const result = await conn.query(
    sql = 'INSERT INTO CONTACTS (ID_ENTREPRISE, MAIL, MOBILE, NOM, PRENOM, DESCRIPTION, RH) VALUES (?, ?, ?, ?, ?, ?, ?)'
    insert(sql, [ID_ENTREPRISE, MAIL, MOBILE, NOM, PRENOM, DESCRIPTION, RH])
      return res.sendStatus(200);
    // );

    // conn.release();

    // Convertir les valeurs BigInt en chaînes dans la réponse JSON
    // const insertId = result.insertId.toString();
    // res.json({ message: 'Contact ajouté avec succès', insertId });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
});

// Example route for handling /api/entreprises
app.get('/api/entreprises', async (req, res) => {
  try {
    // Make a request to localhost:3001/entreprises
    const response = await axios.get('http://localhost:3001/entreprises');

    // Extract entreprises from the response data
    const entreprises = response.data;

    // Respond with the entreprises in JSON format
    res.json({ entreprises });
  } catch (error) {
    console.error('Error fetching posts:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/entreprises/:id', async (req, res) => {
  try {
    // Make a request to localhost:3001/entreprises/:id
    const response = await axios.get(`http://localhost:3001/entreprises/${req.params.id}`);

    // Extract entreprises from the response data
    const entreprise = response.data;

    // Respond with the entreprises in JSON format
    res.json({ entreprise });
  } catch (error) {
    console.error('Error fetching posts:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/personnes', async (req, res) => {
  try {
    fetchDataForAllPersonnes().then(personnes => {
      res.json({personnes});
    });
  } catch (error) {
    console.error('Error fetching posts:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/personnes/:id', async (req, res) => {
  try {
    // Make a request to localhost:3001/personnes/:id
    const response = await axios.get(`http://localhost:3001/personnes/${req.params.id}`);
    // Extract personnes from the response data
    const personne = response.data;

    const resultsArray = await fetchDataForEntreprise(personne.entreprise);
    const result = {
      ...personne,
      entreprise: resultsArray
    };

    // Respond with the personnes in JSON format
    res.json({ result });
  } catch (error) {
    console.error('Error fetching posts:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Catch-all route to serve React app or handle other routes
app.get('*', (req, res) => {
  // Your logic to handle other routes or serve React app
  res.send('Hello, this is the catch-all route!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
