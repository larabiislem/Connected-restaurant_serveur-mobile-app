import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ClientScreen = ({ notifications, loading, error }) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const formatTime = (date) => {
    if (!date) return 'Just now';
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    return diffInMinutes > 0 ? `${diffInMinutes}m ago` : 'Just now';
  };

  const openNotificationDetails = (notification) => {
    setSelectedNotification(notification);
    setModalVisible(true);
  };

  if (loading) {
    return (
      <View style={styles.mainContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.mainContainer}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <ScrollView 
        style={[styles.container, { marginBottom: 60 }]}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerContainer}>
          <View style={{flexDirection:'row'}}>
            <Image 
              source={require('../assets/client.png')} 
              style={styles.headerIcon} 
            />
            <Text style={styles.headerTitle}>Client</Text>
          </View>
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Image source={require('../assets/fleche.png')} />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Pending</Text>
        <ScrollView 
          style={styles.listContainer}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        >
          {notifications.filter(order => !order.isRead).map(order => (
            <View style={styles.pen} key={order.id}>
              <TouchableOpacity onPress={() => openNotificationDetails(order)}>
                <View style={styles.pendingItem}>
                  <Text style={styles.tableText}>Table {order.id_table}</Text>
                  <Text style={styles.timeText}>{formatTime(order.createdAt)}</Text>
                  <Text style={styles.notificationText}>{order.message}</Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitleCompleted}>Completed</Text>
        <ScrollView 
          style={styles.listContainer}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        >
          {notifications.filter(order => order.isRead).map(order => (
            <View style={styles.pen} key={order.id}>
              <TouchableOpacity onPress={() => openNotificationDetails(order)}>
                <View style={styles.completedItem}>
                  <Text style={styles.tableText}>Table {order.id_table}</Text>
                  <Text style={styles.timeText}>{formatTime(order.createdAt)}</Text>
                  <Text style={styles.notificationText}>{order.message}</Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  headerIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333'
  },
  backButton: {
    width: 29,
    height: 29,
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
  pen: {
    marginLeft: 15,
    marginRight: 15,
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
  completedItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2F7B2B',
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

export default ClientScreen;