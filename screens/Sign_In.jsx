import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import loginPersonnel from '../api_login';
import { registerFCMToken } from '../app/fcmService'; // tout en haut



const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);


  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    setLoading(true);
    try {
      const response = await loginPersonnel(email, password);
      console.log("✅ Connexion réussie, réponse serveur :", response.data);
      if (response.data && response.data.personnel) {
        const { id, role = "non défini" } = response.data.personnel;
      
        console.log(`✅ ID utilisateur : ${id}, rôle : ${role}`);
      
        await AsyncStorage.setItem('serveurId', id.toString());
        await registerFCMToken({ id_user: id, role });
        console.log("✅ Token FCM enregistré avec succès");
      } else {
        console.error("❌ Données utilisateur non trouvées dans la réponse serveur :", response.data);
        Alert.alert('Erreur', "Impossible de récupérer les infos utilisateur");
      }
   
      navigation.navigate('Home');
    
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Erreur', 'Identifiants incorrects ou problème de connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/foodie_logo.png')} style={styles.logo} />
        <Text style={styles.title}>Welcome back !</Text>
      </View>
     
      <TextInput 
        placeholder="E-mail" 
        style={styles.input} 
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput 
        placeholder="Password" 
        style={styles.input} 
        secureTextEntry 
        value={password}
        onChangeText={setPassword}
      />
      
      <TouchableOpacity 
        style={styles.button}
        onPress={handleSignIn}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Chargement...' : 'Sign In'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// ... (le reste du style reste inchangé)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 126,
    height: 217,
  },
  title: {
    fontFamily: 'SFProDisplay-Bold',
    fontWeight: '700',
    fontSize: 32,
    lineHeight: 32,
    letterSpacing: 0,
    marginTop: -40,
    marginBottom:10, 
  },
  input: {
    width: 335,
    width:'100%',
    height:66,
    padding: 20,
    paddingBottom:35,
    borderRadius: 20,
    backgroundColor: '#D9D9D9',
    marginBottom: 15,
    paddingTop:-10,
    marginLeft: 30,
    marginRight:30,
  },
  
  button: {
    backgroundColor: '#FFC01D',
    padding: 15,
    borderRadius: 20,
    width: '40%',
    alignItems: 'center',
    marginTop: 55,
  },
  buttonText: {
    fontFamily: 'SFProDisplay-Bold', 
    fontWeight: '700', 
    fontSize: 18,
    lineHeight: 20, 
    letterSpacing: 0, 
    color:'#FFFFFF',
    
  },
  
});

export default SignInScreen;