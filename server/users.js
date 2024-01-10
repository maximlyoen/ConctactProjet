require('dotenv').config();
const bcrypt = require('bcrypt');

const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: 'localhost',
  user: 'user',
  password: 'iut',
  database: 'ContactIut',
  port: '6034',
  allowPublicKeyRetrieval: true,
});

const jwt = require('jsonwebtoken');

async function generateAccessToken(email, password) {
    
    try {
        const conn = await pool.getConnection();
        const rows = await conn.query('SELECT * FROM Utilisateurs where email = ?', [email]);
        conn.release();
        if (rows.length == 0) {
            return {message: "Le compte avec cette adresse mail n'existe pas"}
        }else{
            const match = await bcrypt.compare(password, rows[0].pwd);
              // result == true
              if (match) {
                console.log("Le mot de passe est correct");
                console.log(match);
                const user = { email: rows[0].email, role: rows[0].role };
                return {token : jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '120m' }), message: "Connexion réussie"};
              }else{
                console.log("Le mot de passe est incorrect");
                return {token:"", message: "Le mot de passe est incorrect"}
              }
            
          }
      } catch (err) {
        console.error(err);
        throw err;
      }
}


async function avoirUtilisateurs () {
    try {
      const conn = await pool.getConnection();
      const rows = await conn.query('SELECT * FROM Utilisateurs');
      conn.release();
      return rows;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  
  async function ajouterUtilisateur (nom, prenom, mail, role, password) {
    sql = 'INSERT INTO Utilisateurs (nom, prenom, email, role, pwd) VALUES (?, ?, ?, ?, ?)';
    try {
      const conn = await pool.getConnection();
      const result = await conn.query(sql, [nom, prenom, mail, role, password]);
      conn.release();
      return { message: 'Utilisateur ajouté' };
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  
  async function supprimerUtilisateur (id_utilisateur) {
    try {
      const conn = await pool.getConnection();
      const result = await conn.query('DELETE FROM Utilisateurs WHERE id=?', [id_utilisateur]);
      conn.release();
      return { message: 'Utilisateur supprimé' };
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

module.exports = {
generateAccessToken, avoirUtilisateurs, ajouterUtilisateur, supprimerUtilisateur
}
