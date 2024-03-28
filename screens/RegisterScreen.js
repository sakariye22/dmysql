import React, { useState } from 'react';
import { View, Text, Button, TextInput, Alert } from 'react-native';
import axios from 'axios';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:3010/register/driver', {
        name,
        email,
        password,
        phone_number: phoneNumber,
      });
      Alert.alert("Registration Success", "Your account has been created successfully.");
      navigation.navigate('Login');
    } catch (error) {
      if (error.response) {
        Alert.alert("Registration Failed", error.response.data);
      } else if (error.request) {
        Alert.alert("Registration Failed", "No response from server");
      } else {
        Alert.alert("Registration Error", error.message);
      }
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Register Screen</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName} autoCapitalize='none'
        style={{ width: 200, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20 }}
      />
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
      <TextInput
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        style={{ width: 200, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20 }}
        keyboardType="phone-pad"
      />
      <Button
        title="Register"
        onPress={handleRegister}
      />
      <Button
        title="Go Back to Login"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
};

export default RegisterScreen;
