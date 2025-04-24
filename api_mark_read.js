
import axios from "axios";

const API_URL = "https://pfebackend-production.up.railway.app/api";
const markNotificationRead = async (collectionName, notificationId) => {

  try { 
    const url = `${API_URL}/notifications/mark-read/${collectionName}/${notificationId}`;
    const response = await axios.patch(url);
    if (response.status === 200) {
      return response.data; 
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400) {
        console.error("Erreur : Collection de notifications invalide.");
      } else {
        console.error("Erreur serveur :", error.response.data.message);
      }
    }
    throw error;
  }
};

export default markNotificationRead;
/*
const formatTime = (date) => {
    if (!date) return 'Date inconnue';
    
    const now = currentTime;
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds} secondes`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} heures`;
    return `${Math.floor(diffInSeconds / 86400)} jours`;
  };
  */