import { registerRootComponent } from 'expo';
import { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import {
  collection,
  query,
  where,
  getDocs,
  setLogLevel
} from 'firebase/firestore';
import CheftScreen from '../screens/chef';

// 🔍 Pour voir les requêtes
setLogLevel('debug');

const App = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  const id_cuisinier = 2;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("✅ Utilisateur connecté :", user.uid);
        setIsAuthReady(true);
      } else {
        console.log("❌ Aucun utilisateur connecté");
        setIsAuthReady(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!isAuthReady) return;

    const fetchNotifications = async () => {
      try {
        console.log("Type de id_cuisinier :", typeof id_cuisinier);

        const q = query(
          collection(db, 'notifications_cuisine'),
          where('id_cuisinier', '==', id_cuisinier),
          where('isRead', '==', false)
        );

        const querySnapshot = await getDocs(q);
        const notificationsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate?.() || null
        }));

        console.log("✅ Notifications récupérées :", notificationsData);
        setNotifications(notificationsData);
      } catch (err) {
        console.error("❌ Erreur lors de la récupération des notifications:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [isAuthReady]);

  return (
    <CheftScreen
      notifications={notifications}
      loading={loading}
      error={error}
    />
  );
};

registerRootComponent(App);
export default App;

