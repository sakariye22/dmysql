import React, { useState, useEffect,useCallback } from 'react';
import { View, Text, Button, Modal, StyleSheet, TouchableOpacity, Image, FlatList,Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';

const SearchScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [availableRides, setAvailableRides] = useState([]);
  const navigation2 = useNavigation();
  
  const fetchAvailableRides = async () => {
    const token = await AsyncStorage.getItem('userToken');
    try {
      const response = await fetch('http://localhost:2020/available-rides', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data[1]);
      if (data.availableRides) {
        setAvailableRides(data.availableRides);
        setModalVisible(true);
      } else { 
        console.error('No available rides:', data);
      }
    } catch (error) {
      console.error('Fetch Error:', error);
    }
  };

 
  useFocusEffect(
    useCallback(() => {
      fetchAvailableRides();
      return () => setAvailableRides([]);
    }, [])
  );
  

  

const acceptRide = async (rideId) => {
  const token = await AsyncStorage.getItem('userToken');
  try {
    const response = await fetch('http://localhost:2020/accept-ride', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rideId }),
    });
    const data = await response.json();
    if (response.status === 200) {
      Alert.alert("Success", "Ride accepted successfully");
      // Optionally, refresh the list of available rides or navigate to a different screen
      setModalVisible(false);
      fetchAvailableRides(); // Refresh the list if you're not automatically navigating away
    } else {
      Alert.alert("Error", data.message || "An error occurred while accepting the ride.");
    }
  } catch (error) {
    console.error("Fetch Error:", error);
    Alert.alert("Error", "An error occurred while accepting the ride.");
  }
};

const renderItem = ({ item }) => (
  <View style={styles.rideItem}>
    <Text style={styles.rideText}>Pickup: {item.pickup_address}</Text>
    <Text style={styles.rideText}>Dropoff: {item.dropoff_address}</Text>
    <Text style={styles.rideText}>Fare: ${item.fare}</Text>
    <Button title="Accept" onPress={() => acceptRide(item.id)} color="#2196F3" />
  </View>
);


  return (
    <View style={styles.container}>
      <Text>Search For Rides</Text>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Available Rides</Text>
            <FlatList
              data={availableRides}
              renderItem={renderItem}
              keyExtractor={item => item.id.toString()}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  closeButtonText: {
    fontSize: 24,
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  userDetails: {
    fontSize: 14,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  rideItem: {
    padding: 20,
    marginVertical: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  rideText: {
    fontSize: 16,
    marginBottom: 5,
  },

});

export default SearchScreen;
