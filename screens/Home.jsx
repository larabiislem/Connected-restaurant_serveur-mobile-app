import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = ({ chefNotifications, clientNotifications, loading, error }) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const formatTime = (date) => {
    if (!date) return 'Date inconnue';
    
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds} secondes`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} heures`;
    return `${Math.floor(diffInSeconds / 86400)} jours`;
  };
  const openNotificationDetails = (notification) => {
    setSelectedNotification(notification);
    setModalVisible(true);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

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
            <TouchableOpacity 
              onPress={() => navigation.navigate('Chef')} 
              style={{width:29,height:29,marginRight:5}}
            >
              <Image source={require('../assets/fleche.png')} />
            </TouchableOpacity>
          </View>
          
          {chefNotifications.slice(0, 3).map(notification => (
            <TouchableOpacity 
              key={notification.id} 
              onPress={() => openNotificationDetails(notification)}
            >
              <View style={styles.pendingItem}>
                <Text style={styles.tableText}>Table {notification.id_table}</Text>
                <Text style={styles.timeText}>{formatTime(notification.createdAt)}</Text>
                <Text style={styles.notificationText}>{notification.message}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Client Section */}
        <View style={styles.section}>
          <View style={styles.sectionRow}>
            <View style={{flexDirection:'row'}}>
              <Image source={require('../assets/client.png')} style={styles.sectionIcon} />
              <Text style={styles.sectionTitle}>Client</Text>
            </View>
            <TouchableOpacity 
              onPress={() => navigation.navigate('Client')} 
              style={{width:29,height:29,marginRight:5}}
            >
              <Image source={require('../assets/fleche.png')} />
            </TouchableOpacity>
          </View>
          
          {clientNotifications.slice(0, 3).map(notification => (
            <TouchableOpacity 
              key={notification.id} 
              onPress={() => openNotificationDetails(notification)}
            >
              <View style={styles.pendingItem}>
                <Text style={styles.tableText}>Table {notification.id_table}</Text>
                <Text style={styles.timeText}>{formatTime(notification.createdAt)}</Text>
                <Text style={styles.notificationText}>{notification.message}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Notification Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Notification Details</Text>
            {selectedNotification && (
              <>
                <Text style={styles.modalText}>Table: {selectedNotification.id_table}</Text>
                <Text style={styles.modalText}>Message: {selectedNotification.message}</Text>
                <Text style={styles.modalText}>Time: {formatTime(selectedNotification.createdAt)}</Text>
                {selectedNotification.plats && (
                  <View>
                    <Text style={styles.modalText}>Plats:</Text>
                    {selectedNotification.plats.map((plat, index) => (
                      <Text key={index} style={styles.modalText}>- {plat.name}</Text>
                    ))}
                  </View>
                )}
              </>
            )}
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => navigation.navigate('Chef')}
        >
          <Image source={require('../assets/chef.png')} style={styles.navIconC} />
        </TouchableOpacity>
        <View style={styles.home}>
          <TouchableOpacity 
            style={styles.navHomeButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Image source={require('../assets/home.png')} style={styles.navIconH} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => navigation.navigate('Client')}
        >
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
  header: { 
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#9e090f',
    padding: 20 
  },
  profileImage: { 
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    marginRight: 10 
  },
  greeting: { 
    color: 'white',
    fontSize: 14 
  },
  userName: { 
    color: 'white', 
    fontSize: 18, 
    fontWeight: 'bold'
  },
  section: { 
    margin: 10,
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
  sectionIcon: { 
    width: 30,
    height: 30,
    marginBottom: 5 
  },
  sectionTitle: { 
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 10
  },
  pendingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFC107',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    height: 60
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
  notificationText: {
    fontSize: 14,
    color: '#fff',
    flex: 1,
    textAlign: 'right',
    marginRight: 10
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#555',
  },
  modalButton: {
    marginTop: 20,
    backgroundColor: '#9e090f',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
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
  home: {
    marginTop: -40,
  },
  navHomeButton: { 
    padding: 15,
    backgroundColor: '#FFC01D',
    borderRadius: 50,
  },
  navIconC: {
    marginTop: 15,
    width: 39,
    height: 39,
    marginLeft: 20,
  },
  navIconH: {
    width: 65,
    height: 65,
  },
  navIconU: {
    marginTop: 18,
    width: 39,
    height: 39,
    marginRight: 20,
  },
});

export default HomeScreen;