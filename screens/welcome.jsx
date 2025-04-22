import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const FoodieScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/foodie_logo.png')} style={styles.logo} />
      <View style={styles.foodie}>
      <Text style={styles.title}>Foodie</Text>
      </View>
      
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9e090f',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:-110,
  },
  logo: {
    width: 350,
    height: 500,
    marginBottom:60,
  },

  foodie:{
   marginTop: -150,
  },

  title: {
    fontSize: 64 ,
    fontWeight: 700,
    color: '#FFFFFF',
    lineHeight:100 ,
    
    textAlign: 'center',
    
  },
});

export default FoodieScreen;

