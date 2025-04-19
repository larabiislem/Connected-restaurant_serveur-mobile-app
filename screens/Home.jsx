import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Switch, TouchableOpacity, ScrollView } from 'react-native';

let ordersData = [
  { id: 1, table: 'Table 01', time: '10m ago', completed: false },
  { id: 2, table: 'Table 05', time: '6m ago', completed: false },
  { id: 3, table: 'Table 07', time: '2m ago', completed: false },
  { id: 4, table: 'Table 07', time: '2m ago', completed: false },
  { id: 4, table: 'Table 07', time: '2m ago', completed: false },
  
];



const HomeScreen = () => {
  const [orders, setOrders] = useState([...ordersData]);
  
    useEffect(() => {
      setOrders([...ordersData]);
    }, [ordersData]);
  
    

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../assets/profile.png')} style={styles.profileImage} />
        <View>
          <Text style={styles.greeting}>Good Morning</Text>
          <Text style={styles.userName}>Lokman</Text>
        </View>
      </View>

      <ScrollView>
        {/* Chef Section */}
        
        <View style={styles.section}>
            <View style={styles.sectionRow}>
            <View style={{flexDirection:'row'}}>
             <Image source={require('../assets/chef.png')} style={styles.sectionIcon} />
             <Text style={styles.sectionTitle}>Chef</Text>
            </View>

            <View>
             <TouchableOpacity style={{width:29,height:29,marginRight:5}}>
              <Image source={require('../assets/fleche.png')}  />
             </TouchableOpacity>
            </View>
            </View>
            {orders.filter(order => !order.completed).map(order => (
              <View key={order.id} style={styles.pendingItem}>
                 <Text style={styles.tableText}>{order.table}</Text>
                 <Text style={styles.timeText}>{order.time}</Text>
                   <TouchableOpacity 
                      style={styles.checkboxP}
                         >
                    </TouchableOpacity>
               </View>  ))}        
   

        </View>
       

        {/* Client Section */}
        <View style={styles.section}>
          <View style={styles.sectionRow}   >
            <View style={{flexDirection:'row'}}>
             <Image source={require('../assets/client.png')} style={styles.sectionIcon} />
             <Text style={styles.sectionTitle}>Client</Text>
            </View>

            <View>
             <TouchableOpacity style={{width:29,height:29,marginRight:5}}>
              <Image source={require('../assets/fleche.png')}  />
             </TouchableOpacity>
            </View>

          </View>
          {orders.filter(order => !order.completed).map(order => (
          <View key={order.id} style={styles.pendingItem}>
                 <Text style={styles.tableText}>{order.table}</Text>
                 <Text style={styles.timeText}>{order.time}</Text>
                   <TouchableOpacity 
                     
                     style={styles.checkboxP}
                         >
                   
                     </TouchableOpacity>
               </View>  ))}

        </View>
      </ScrollView>

      {/* Navigation Bar */}
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
  container: { 
    flex: 1,
     backgroundColor: '#FFFFFF'
     },
  header: { flexDirection: 'row',
     alignItems: 'center',
      backgroundColor: '#9e090f',
       padding: 20 
      },
  profileImage: { width: 40, 
    height: 40, 
    borderRadius: 20, 
    marginRight: 10 
  },
  greeting: { color: 'white',
     fontSize: 14 
    },
  userName: { color: 'white', 
    fontSize: 18, 
    fontWeight: 'bold'
   },
  section: { margin: 10,
     padding: 10,
      backgroundColor: '#F4F5F6',
       borderRadius: 10
       },
  sectionRow: { 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
     marginLeft: 10,
      marginBottom: 5 
    },
  sectionIcon: { width: 30,
     height: 30,
      marginBottom: 5 
    },
  sectionTitle: { fontSize: 18,
     fontWeight: 'bold',
      marginBottom: 5
     },
  orderCard: { flexDirection: 'row',
     justifyContent: 'space-between',
      alignItems: 'center',
       backgroundColor: '#FFC107',
        padding: 15,
         borderRadius: 10, 
         marginBottom: 5
         },
  tableText: { fontSize: 16,
     fontWeight: 'bold'
     },
  timeText: { fontSize: 12,
     color: '#555'
   },
  completedIcon: { width: 20, 
    height: 20
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

  checkImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },







});

export default HomeScreen;
