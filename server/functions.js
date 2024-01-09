const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'user',
  password: 'iut',
  database: 'ContactIut',
  port: '6034' // Remplacez par le port de votre base de données MySQL
});

db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données MySQL:', err);
  } else {
    console.log('Connexion à la base de données MySQL réussie');
  }
});

async function testQuery(entrepriseId){

  const sql = `SELECT * FROM ENTREPRISE WHERE id_entreprise = ${entrepriseId}`;

  try {
    const [rows, fields] = await db.promise().query(sql);
    console.log(rows[0]);
    return rows[0];
  } catch (err) {
    console.error('Erreur lors de la récupération des données depuis MySQL:', err);
    throw err; // Re-throw the error to propagate it to the calling function if needed
  }
}

const axios = require('axios');

async function fetchDataForEntreprise(entrepriseId) {
  try {
    const response = await axios.get(`http://localhost:3001/entreprises/${entrepriseId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data for entreprise ${entrepriseId}:`, error.message);
    throw error;
  }
}

async function fetchData() {
  try {
    const response = await axios.get('http://localhost:3001/personnes');
    const personnes = response.data;
    return personnes;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error;
  }
}

async function fetchDataForAllPersonnes() {
  try {
    const personnes = await fetchData();
    const results = [];

    for (const personne of personnes) {
      const dataEntreprise = await fetchDataForEntreprise(personne.entreprise);
      const result = {
        ...personne,
        entreprise: dataEntreprise
      };
      results.push(result);
    }

    return results;
  } catch (error) {
    console.error('Error fetching data for all personnes:', error.message);
    throw error;
  }
}
function insert(req, params) {
  db.execute(req, params);
}

// Export the function
module.exports = {
  fetchDataForAllPersonnes,
  fetchDataForEntreprise,
  testQuery,
  insert
}