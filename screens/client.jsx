import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';

let ordersData = [
  { id: 1, table: 'Table 01', time: '10m ago', completed: false },
  { id: 2, table: 'Table 05', time: '6m ago', completed: false },
  { id: 3, table: 'Table 07', time: '2m ago', completed: false },
  { id: 4, table: 'Table 12', time: '15m ago', completed: true },
  { id: 5, table: 'Table 15', time: '20m ago', completed: false },
];

const ClientScreen = () => {
  const [orders, setOrders] = useState([...ordersData]);

  useEffect(() => {
    setOrders([...ordersData]);
  }, [ordersData]);

  const toggleCompletion = (id) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, completed: !order.completed } : order
      )
    );
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView 
        style={[styles.container, { marginBottom: 60 }]}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* NOUVEAU : En-tête Chef ajouté ici */}
        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20, paddingHorizontal: 16,justifyContent:'space-between'}}>
          
  
        <View style={{flexDirection:'row'}}>
          <Image 
            source={require('../assets/client.png')} 
            style={{width: 40, height: 40, marginRight: 10,marginLeft:-18}} 
          />
          <Text style={{fontSize: 24, fontWeight: 'bold', color: '#333'}}>Chef</Text>
        </View>

        <View>
            <TouchableOpacity style={{width:29,height:29,marginRight:-15}}>
              <Image source={require('../assets/fleche.png')}  />
            </TouchableOpacity>

          </View>


        </View>

        <Text style={styles.sectionTitle}>Pending</Text>
        <ScrollView 
          style={styles.listContainer}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={true}
        >
          {orders.filter(order => !order.completed).map(order => (
            <View style={styles.pen}>
            <View key={order.id} style={styles.pendingItem}>
              <Text style={styles.tableText}>{order.table}</Text>
              <Text style={styles.timeText}>{order.time}</Text>
              <TouchableOpacity 
                onPress={() => toggleCompletion(order.id)} 
                style={styles.checkboxP}
              >
                {order.completed && (
                  <Image 
                    source={require('../assets/valide.png')} 
                    style={styles.checkImage}
                  />
                )}
              </TouchableOpacity>
            </View>
            </View>
          ))}
        </ScrollView>

        <View style={{ height: 200 }} />

        <Text style={styles.sectionTitleCompleted}>Completed</Text>
        <ScrollView 
          style={styles.listContainer}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={true}
        >

          {orders.filter(order => order.completed).map(order => (
            <View style={styles.pen}>
            <View key={order.id} style={styles.completedItem}>
              <Text style={styles.tableText}>{order.table}</Text>
              <Text style={styles.timeText}>{order.time}</Text>
              <TouchableOpacity 
                onPress={() => toggleCompletion(order.id)} 
                style={styles.checkboxC}
              >
                <Image 
                  source={require('../assets/valide.png')} 
                  style={styles.checkImage}
                />
              </TouchableOpacity>
            </View>
            </View>
          ))}
        </ScrollView>
      </ScrollView>

      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navButton}>
          <Image source={require('../assets/chef.png')} style={styles.navIconC} />
        </TouchableOpacity>
         <View style={styles.home}>
        <TouchableOpacity style={styles.navHomeButton}>
          <Image source={require('../assets/home.png')} style={styles.navIconH} />
        </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.navButton}>
          <Image source={require('../assets/client.png')} style={styles.navIconU} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  listContainer: {
    maxHeight: 200,
  },
  listContent: {
    paddingBottom: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#444',
  },
  sectionTitleCompleted: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#2E7D32',
  },
  pen:{
    marginLeft:15,
    marginRight:15,
  },
  pendingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFC107',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    height:60
    
  },
  completedItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2F7B2B',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    height:60
  },
  tableText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  timeText: {
    fontSize: 14,
    color: '#fff',
  },
  checkboxP: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    backgroundColor:'#FFFFFF',
    borderColor: '#7D838B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxC: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#2F7B2B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  navBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 5,
    borderTopWidth: 1,
    borderColor: '#F4F5F6',
    zIndex: 1,
  },
  navButton: {
    padding: 10,
  },
  home:{
    marginTop:-40,
  },
  navHomeButton: {
    padding: 15,
    backgroundColor: '#FFC01D',
    borderRadius: '50%',
    
  },
  navIconC: {
    marginTop:15,
    width: 39,
    height: 39,
    marginLeft:20,
  },
  navIconH: {
    width: 65,
    height: 65,
    
  },
  navIconU: {
    marginTop:18,
    width: 39,
    height: 39,
    marginRight:20,
  },
});

export default ClientScreen;