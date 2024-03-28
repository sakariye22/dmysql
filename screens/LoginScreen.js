import React, { useState } from 'react';
import { View, Text, Button, TextInput, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3010/login/driver', { email, password });
      const { token } = response.data;
      await AsyncStorage.setItem('userToken', token);
      Alert.alert("Login Success", "You are now logged in.");
      navigation.navigate('Home');
    } catch (error) {
      if (error.response) {
        Alert.alert("Login Failed", error.response.data);
      } else if (error.request) {
        Alert.alert("Login Failed", "No response from server");
      } else {
        Alert.alert("Login Error", error.message);
      }
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Driver Login Screen</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ width: 200, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20 }}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={{ width: 200, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20 }}
        secureTextEntry
      />
      <Button
        title="Register"
        onPress={() => navigation.navigate('Register')}
      />
      <Button
        title="Login"
        onPress={handleLogin}
      />
    </View>
  );
};

export default LoginScreen;
