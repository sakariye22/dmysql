import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapScreen from './MapScreen'; // This is your actual Home Screen with the map
import EarningsScreen from './EarningsScreen';
import SearchScreen from './SearchScreen';
import ProfileScreen from './ProfileScreen';
import Settings from './Settings';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        activeTintColor: 'yellow', 
        inactiveTintColor: 'gray', 
        style: {
          backgroundColor: 'black', 
        },
      }}
    >
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Earnings" component={EarningsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

export default HomeScreen;
