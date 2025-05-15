import { registerRootComponent } from 'expo';
import { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs, setLogLevel } from 'firebase/firestore';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChefScreen from '../screens/chef';
import ClientScreen from '../screens/client';
import HomeScreen from '../screens/Home';
import SignInScreen from '../screens/Sign_In';
import { registerFCMToken } from '../app/fcmService';
import { setupFCMForegroundHandler } from '../app/fcmHandler';

setLogLevel('debug');

const Stack = createStackNavigator();

const Main = () => {
  const [chefNotifications, setChefNotifications] = useState([]);
  const [clientNotifications, setClientNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [serveurId, setServeurId] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const id = await AsyncStorage.getItem('serveurId');
        
        if (id) {
          setServeurId(parseInt(id));
          setIsSignedIn(true);
        } else {
          setIsSignedIn(false);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
        setIsSignedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  useEffect(() => {
    if (!isSignedIn || !serveurId) return;

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
  }, [isSignedIn, serveurId]);

  useEffect(() => {
    if (!isAuthReady || !serveurId) return;

    const fetchNotifications = async () => {
      try {
        const chefQuery = query(
          collection(db, 'notifications_serveur'),
          where('id_serveur', '==', serveurId)
        );

        const clientQuery = query(
          collection(db, 'notifications_serveur_pour_client'),
          where('id_serveur', '==', serveurId)
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
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [isAuthReady, serveurId]);

  useEffect(() => {
    // 👇 Ceci est suffisant pour activer la réception des notifs en avant-plan
    setupFCMForegroundHandler();
  }, []);
  
  return (
   
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        
          <>
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
          </>
       
         
       
      </Stack.Navigator>
  
  );
};

registerRootComponent(Main);
export default Main;