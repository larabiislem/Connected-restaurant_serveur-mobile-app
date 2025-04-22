import { registerRootComponent } from 'expo';
import { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs, setLogLevel } from 'firebase/firestore';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ChefScreen from '../screens/chef';
import ClientScreen from '../screens/client';
import HomeScreen from '../screens/Home';

setLogLevel('debug');

const Stack = createStackNavigator();

const App = () => {
  const [chefNotifications, setChefNotifications] = useState([]);
  const [clientNotifications, setClientNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  const id_serveur = 2; // Remplacez par l'ID réel du serveur

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
        // Requête pour les notifications du chef
        const chefQuery = query(
          collection(db, 'notifications_serveur'),
          where('id_serveur', '==', id_serveur),
          where('type', '==', 'commande_prête')
        );

        // Requête pour les notifications du client
        const clientQuery = query(
          collection(db, 'notifications_serveur'),
          where('id_serveur', '==', id_serveur),
          where('type', '==', 'call_waiter')
        );

        const [chefSnapshot, clientSnapshot] = await Promise.all([
          getDocs(chefQuery),
          getDocs(clientQuery)
        ]);

        const chefData = chefSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate?.() || null
        }));

        const clientData = clientSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate?.() || null
        }));

        setChefNotifications(chefData);
        setClientNotifications(clientData);
      } catch (err) {
        console.error("❌ Erreur lors de la récupération des notifications:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); // Rafraîchir toutes les 30 secondes
    return () => clearInterval(interval);
  }, [isAuthReady]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home">
          {props => (
            <HomeScreen 
              {...props} 
              chefNotifications={chefNotifications} 
              clientNotifications={clientNotifications}
              loading={loading}
              error={error}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Chef">
          {props => (
            <ChefScreen 
              {...props} 
              notifications={chefNotifications}
              loading={loading}
              error={error}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Client">
          {props => (
            <ClientScreen 
              {...props} 
              notifications={clientNotifications}
              loading={loading}
              error={error}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

registerRootComponent(App);
export default App;