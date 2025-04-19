import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const SignUpScreen = () => {
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/foodie_logo.png')} style={styles.logo} />
        <Text style={styles.title}>Welcome back !</Text>
      </View>
     
      <TextInput placeholder="E-mail" style={styles.input} />
      <TextInput placeholder="Password" style={styles.input} secureTextEntry onChangeText={setPassword} />
      
     
    
      
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
    
    </View>
  );
};

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

export default SignUpScreen;