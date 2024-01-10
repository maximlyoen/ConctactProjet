const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: 'localhost',
  user: 'user',
  password: 'iut',
  database: 'ContactIut',
  port: '6034',
  allowPublicKeyRetrieval: true,
});



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
    Contacts
*/

//affiche tous les contacts et leur tags associées
async function avoirTousLestags(){
  const sql = `
  SELECT CONTACTS.id_contacts, id_entreprise, nom, prenom, mail, mobile, description, rh,  nom_tag, prix_ta,  annee 
  FROM PARTICIPE 
  INNER JOIN CONTACTS on PARTICIPE.id_contacts = CONTACTS.id_contacts 
  INNER JOIN TAG on PARTICIPE.id_tag = TAG.id_tag 
  INNER JOIN ANNEE on PARTICIPE.id_annee = ANNEE.id_annee
`;
  
try {
    const conn = await pool.getConnection();
    const rows = await conn.query(sql);
    conn.release();
    return rows;
  } catch (err) {
    console.error(err);
    throw err;
  }
}


// Affiche les tags d'un contact
async function avoirTagsContacts(id_contacts){
  const sql = `
  SELECT
    CONTACTS.ID_CONTACTS,
    CONTACTS.ID_ENTREPRISE AS CONTACT_ID_ENTREPRISE,
    CONTACTS.MAIL AS CONTACT_MAIL,
    CONTACTS.MOBILE AS CONTACT_MOBILE,
    -- ... other columns from CONTACTS
    ENTREPRISE.ID_ENTREPRISE,
    ENTREPRISE.NOM AS ENTREPRISE_NOM,
    ENTREPRISE.IMAGE AS ENTREPRISE_IMAGE,
    -- ... other columns from ENTREPRISE
    TAG.ID_TAG,
    TAG.NOM_TAG AS TAG_NOM_TAG,
    PARTICIPE.PRIX_TA AS TAG_PRIX_TA,
    ANNEE.ANNEE  -- Add the column from ANNEE table
    -- ... other columns from PARTICIPE
  FROM CONTACTS
  LEFT JOIN ENTREPRISE ON CONTACTS.ID_ENTREPRISE = ENTREPRISE.ID_ENTREPRISE
  LEFT JOIN PARTICIPE ON CONTACTS.ID_CONTACTS = PARTICIPE.ID_CONTACTS
  LEFT JOIN TAG ON PARTICIPE.ID_TAG = TAG.ID_TAG
  LEFT JOIN ANNEE ON PARTICIPE.ID_ANNEE = ANNEE.ID_ANNEE  -- Add this line for the join with ANNEE
  WHERE CONTACTS.ID_CONTACTS = ?;
`;
  try {
    const conn = await pool.getConnection();
    const rows = await conn.query(sql, [id_contacts]);
    conn.release();
    return rows;
  } catch (err) {
    console.error(err);
    throw err;
  }
};



// // Afficher la liste des contacts
async function avoirContacts () {
  try {
    const conn = await pool.getConnection();
    const rows = await conn.query('SELECT ID_CONTACTS, ENTREPRISE.NOM AS NOM_ENTREPRISE, MOBILE, CONTACTS.NOM, PRENOM, DESCRIPTION, MAIL, RH FROM CONTACTS INNER JOIN ENTREPRISE ON ENTREPRISE.ID_ENTREPRISE = CONTACTS.ID_ENTREPRISE');
    conn.release();
    return rows;
} catch (err) {
    console.error(err);
    throw err;
  }
};

// Récupérer un contact par son ID
async function avoirContact (id_contact) {
  const sql = `SELECT ID_CONTACTS, ENTREPRISE.NOM AS NOM_ENTREPRISE, MOBILE, CONTACTS.NOM, PRENOM, DESCRIPTION, MAIL, RH 
  FROM CONTACTS 
  INNER JOIN ENTREPRISE ON ENTREPRISE.ID_ENTREPRISE = CONTACTS.ID_ENTREPRISE 
  WHERE ID_CONTACTS = ?`;

  try {
    const conn = await pool.getConnection();
    const rows = await conn.query(sql, [id_contact]);
    conn.release();

    if (rows.length > 0) {
      return rows; // Si un contact est trouvé, renvoyer le premier contact du tableau
    } else {
      return { message: 'Contact non trouvé' };
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Récupérer un contact par son email
async function avoirContactAvecMail(mail) {
  const sql = `SELECT ID_CONTACTS, ENTREPRISE.NOM AS NOM_ENTREPRISE, MOBILE, CONTACTS.NOM, PRENOM, DESCRIPTION, MAIL, RH 
  FROM CONTACTS 
  INNER JOIN ENTREPRISE ON ENTREPRISE.ID_ENTREPRISE = CONTACTS.ID_ENTREPRISE 
  WHERE MAIL = ?`
  try {
    const conn = await pool.getConnection();
    const rows = await conn.query(sql, [mail]);
    conn.release();

    if (rows.length > 0) {
      return rows; // Si un utilisateur est trouvé, renvoyer le premier utilisateur du tableau
    } else {
      return { message: 'Contact non trouvé' };
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

//ajouter contact
async function ajouterContact(id_entreprise, mail, mobile, nom, prenom, description, rh) {
  sql = 'INSERT INTO CONTACTS (ID_ENTREPRISE, MAIL, MOBILE, NOM, PRENOM, DESCRIPTION, RH) VALUES (?, ?, ?, ?, ?, ?, ?)';
  try {
    const conn = await pool.getConnection();
    await conn.query(sql, [id_entreprise, mail, mobile, nom, prenom, description, parseInt(rh)]);
    conn.release();
    return { message: 'Contact ajouté' };
   
  } catch (err) {
    console.error(err);
    throw err;
  }
};


//modifier contact
async function modifierContact (id_entreprise, mail, mobile, nom, prenom, description, rh, contactId) {
  sql = 'UPDATE CONTACTS SET ID_ENTREPRISE=?, MAIL=?, MOBILE=?, NOM=?, PRENOM=?, DESCRIPTION=?, RH=? WHERE ID_CONTACTS=?';
  try {
    const conn = await pool.getConnection();
    const result = await conn.query(
      sql,
      [id_entreprise, mail, mobile, nom, prenom, description, parseInt(rh), contactId]
    );

    conn.release();

    // Convertir les valeurs BigInt en chaînes dans la réponse JSON
    return result.affectedRows.toString();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

//supprimer contact
async function supprimerContact (id_contact) {
  try {

    const conn = await pool.getConnection();
    const result = await conn.query('DELETE FROM CONTACTS WHERE ID_CONTACTS=?', [id_contact]);

    conn.release();

  } catch (err) {
    console.error(err);
    throw err;
  }
};
// affiche la liste des contacts avec leur entreprise associée
async function avoirContacstEntreprises () {
  sql = `
  SELECT
    CONTACTS.ID_CONTACTS,
    CONTACTS.ID_ENTREPRISE AS CONTACT_ID_ENTREPRISE,
    CONTACTS.MAIL AS CONTACT_MAIL,
    CONTACTS.MOBILE AS CONTACT_MOBILE,
    -- ... d'autres colonnes de CONTACTS
    ENTREPRISE.ID_ENTREPRISE,
    ENTREPRISE.NOM AS ENTREPRISE_NOM,
    ENTREPRISE.IMAGE AS ENTREPRISE_IMAGE
    -- ... d'autres colonnes de ENTREPRISE
  FROM CONTACTS
  LEFT JOIN ENTREPRISE ON CONTACTS.ID_ENTREPRISE = ENTREPRISE.ID_ENTREPRISE
`
  try {
    const conn = await pool.getConnection();
    const rows = await conn.query(sql);
    conn.release();
    return rows;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// /*
//     Entreprises
// */

// Afficher la liste des entreprises
async function avoirListeEntreprises() {
  try {
    const conn = await pool.getConnection();
    const rows = await conn.query('SELECT * FROM ENTREPRISE');
    conn.release();
    return rows;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Récupérer une Entreprise par son ID
async function avoirListeEntrepriseParId (id_entreprise) {
    try {
      const conn = await pool.getConnection();
      const rows = await conn.query('SELECT * FROM ENTREPRISE WHERE ID_ENTREPRISE = ?', [id_entreprise]);
      conn.release();
  
      if (rows.length > 0) {
        return rows // Si une Entreprise est trouvé, renvoyer la première du tableau
      } else {
        return { message: 'Entreprise non trouvé' };
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  
// Récupérer une Entreprise par son nom
async function avoirListeEntrepriseParNom (nom_entreprise) {
    try {
    const conn = await pool.getConnection();
    const rows = await conn.query('SELECT * FROM ENTREPRISE WHERE NOM = ?', [nom_entreprise]);
    conn.release();

    if (rows.length > 0) {
        return rows; // Si une Entreprise est trouvé, renvoyer la première du tableau
    } else {
        return { message: 'Entreprise non trouvé' };
    }
    } catch (err) {
    console.error(err);
    throw err;
    
  }
};

//ajouter entreprise
async function ajouterEntreprise(nom, image) {
  try {

    const conn = await pool.getConnection();
    const result = await conn.query(
      'INSERT INTO ENTREPRISE (NOM, IMAGE) VALUES (?, ?)',
      [nom, image]
    );

    conn.release();

    // Convertir les valeurs BigInt en chaînes dans la réponse JSON
    const insertId = result.insertId.toString();
    return { message: 'Entreprise ajouté avec succès', insertId };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

//modifier entreprise
async function modifierEntreprise(nom, image, entreprisesId) {
  try {

    const conn = await pool.getConnection();
    const result = await conn.query(
      'UPDATE ENTREPRISE SET NOM=?, IMAGE=? WHERE ID_ENTREPRISE=?',
      [nom, image, entreprisesId]
    );

    conn.release();

    // Convertir les valeurs BigInt en chaînes dans la réponse JSON
    const affectedRows = result.affectedRows.toString();
    return { message: 'Contact modifié avec succès', affectedRows };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

//supprimer entreprise
async function supprimerEntreprise (id_entreprise) {
  try {

    const conn = await pool.getConnection();
    const result = await conn.query('DELETE FROM ENTREPRISE WHERE ID_ENTREPRISE=?', [id_entreprise]);

    conn.release();

    // Convertir les valeurs BigInt en chaînes dans la réponse JSON
    const affectedRows = result.affectedRows.toString();
    if (affectedRows > 0) {
      return { message: 'Entreprise supprimé avec succès', affectedRows };
    } else {
      return { message: 'Contact non trouvé' };
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Liste des contacts d'une entreprise
async function avoirContactsEntreprise (id_entreprise) {
  sql = `
  SELECT
    CONTACTS.ID_CONTACTS,
    CONTACTS.ID_ENTREPRISE AS CONTACT_ID_ENTREPRISE,
    CONTACTS.MAIL AS CONTACT_MAIL,
    CONTACTS.MOBILE AS CONTACT_MOBILE,
    -- ... d'autres colonnes de CONTACTS
    ENTREPRISE.ID_ENTREPRISE,
    ENTREPRISE.NOM AS ENTREPRISE_NOM,
    ENTREPRISE.IMAGE AS ENTREPRISE_IMAGE
    -- ... d'autres colonnes de ENTREPRISE
  FROM CONTACTS
  LEFT JOIN ENTREPRISE ON CONTACTS.ID_ENTREPRISE = ENTREPRISE.ID_ENTREPRISE
  WHERE ENTREPRISE.ID_ENTREPRISE = ?
`

  try {
    const conn = await pool.getConnection();
    const rows = await conn.query(sql, [id_entreprise]);
    conn.release();
    if (rows.length > 0) {
      return rows; // Si une Entreprise est trouvé, renvoyer la première du tableau
    } else {
      return { message: 'Entreprise non trouvé' };
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};
    
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
    Tag
*/

async function avoirTags() {
  try {
    const conn = await pool.getConnection();
    const rows = await conn.query('SELECT * FROM TAG');
    conn.release();
    return rows;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

//afficher tags par rapport id
async function avoirTagsId (id_tag) {
  try {
    const conn = await pool.getConnection();
    const rows = await conn.query('SELECT * FROM TAG WHERE ID_TAG = ?', [id_tag]);
    conn.release();

    if (rows.length > 0) {
      return rows; // Si un tag est trouvé, renvoyer le premier du tableau
    } else {
      res.status(404).json({ message: 'Tag non trouvé' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
};

// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




// Export the function
module.exports = {
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
  avoirTagsId
}