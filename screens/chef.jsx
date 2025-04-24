import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ClientScreen = ({ notifications, loading, error, markAsCompleted }) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [pendingNotif, setPendingNotif] = useState([]);
  const [completedNotif, setCompletedNotif] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Mettre à jour le temps toutes les minutes
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Mise à jour toutes les minutes

    return () => clearInterval(timer);
  }, []);

  // Initialiser les notifications
  useEffect(() => {
    if (notifications) {
      setPendingNotif(notifications.filter(n => !n.isRead));
      setCompletedNotif(notifications.filter(n => n.isRead));
    }
  }, [notifications]);

  const formatTime = (date) => {
    if (!date) return 'Date inconnue';
    
    const now = currentTime;
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

  const handleMarkCompleted = () => {
    if (selectedNotification) {
      // Mettre à jour Firestore
      markAsCompleted(selectedNotification.id);
      
      // Mettre à jour l'état local
      setPendingNotif(pendingNotif.filter(n => n.id !== selectedNotification.id));
      setCompletedNotif([...completedNotif, {...selectedNotification, isRead: true}]);
      
      setModalVisible(false);
    }
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
          {pendingNotif.map(order => (
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
          {completedNotif.map(order => (
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
                
                {!selectedNotification.isRead && (
                  <TouchableOpacity
                    style={styles.modalButtonCompleted}
                    onPress={handleMarkCompleted}
                  >
                    <Text style={styles.modalButtonText}>Mark Completed</Text>
                  </TouchableOpacity>
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

// ... (le reste du style reste inchangé)

/*


  const formatTime = (date) => {
    if (!date) return 'Date inconnue';
    
    const now = currentTime;
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds} secondes`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} heures`;
    return `${Math.floor(diffInSeconds / 86400)} jours`;
  };*/