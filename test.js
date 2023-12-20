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

// Call the async function and log the array using await
(async () => {
  const resultsArray = await fetchDataForEntreprise(1);
  console.log(resultsArray);
})();
