import axios from "axios";

const API_URL = "https://pfebackend-production.up.railway.app/api";


const loginPersonnel = async (email, password) => {
  try {
    const body = {
      email,
      password,
    };

    const response = await axios.post(`${API_URL}/login-personnel`, body);


    if (response.status === 200) {
      return response.data; 
    }
  } catch (error) {
  
    if (error.response) {
      if (error.response.status === 400) {
        console.error("Erreur : Email et mot de passe requis.");
      } else if (error.response.status === 401) {
        console.error("Erreur : Identifiants incorrects.");
      } else {
        console.error("Erreur serveur :", error.response.data.message);
      }
    }
    throw error;
  }
};

export default loginPersonnel;