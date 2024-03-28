import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet,Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Settings = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      console.log(`Token retrieved from AsyncStorage: ${token}`);
      if (token) {
        await axios.post('http://localhost:3010/logout', {}, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        await AsyncStorage.removeItem('userToken');
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      }
    } catch (error) {
      Alert.alert("Logout Failed", "An error occurred while trying to log out.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.header}>Personal information</Text>
        <TouchableOpacity style={styles.item} onPress={() => {}}>
          <Text style={styles.itemText}>Edit profile</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <Text style={styles.header}>Notifications</Text>
        <TouchableOpacity style={styles.item} onPress={() => {}}>
          <Text style={styles.itemText}>Notification preferences</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <Text style={styles.header}>Payments & Banking</Text>
        <TouchableOpacity style={styles.item} onPress={() => {}}>
          <Text style={styles.itemText}>Manage bank accounts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={() => {}}>
          <Text style={styles.itemText}>Add a card</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={() => {}}>
          <Text style={styles.itemText}>View payment history</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Log out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    marginTop: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#f0f0f0',
  },
  item: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd',
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    marginTop: 30,
    backgroundColor: 'yellow',
    alignItems: 'center',
    paddingVertical: 15,
    marginHorizontal: 20,
    borderRadius: 5,
  },
  logoutButtonText: {
    fontSize: 18,
    color: '#000',
  },
});

export default Settings;
