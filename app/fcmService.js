import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  return (
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL
  );
}







export async function registerFCMToken({ id_user, role }) {
  const permission = await requestUserPermission();
  if (!permission) return;

  try {
    const token = await messaging().getToken();
    console.log("✅ Token FCM généré :", token);

    const payload = {
      fcmToken: token, 
      id_user: id_user, // utilise ce que la fonction reçoit en paramètre
      role: role,
    };
    
    console.log("🔍 Avant envoi vers Firestore :");
    console.log("👉 ID utilisateur :", id_user);
    console.log("👉 Rôle :", role);
    console.log("👉 Token :", token);

        console.log("📦 Envoi des infos FCM au backend :", payload);
        const response = await fetch('https://accomplished-vision-production.up.railway.app/api/fcm-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        console.log('✅ Token FCM envoyé');
        
        if (!response.ok) {
          const errorData = await response.json();
          console.error("📥 Réponse erreur du backend :", errorData); // 👈 LOG TRÈS UTILE
          throw new Error(`Erreur backend: ${errorData.error || response.status}`);
        }
        
        const responseData = await response.json();
        console.log("✅ Réponse backend :", responseData.message);
        
    } catch (err) {
      console.error('❌ Erreur envoi token FCM :', err);
  }
}
