import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import MapView from 'react-native-maps'; // Import the MapView

const MapScreen = () => {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} />

      <View style={styles.buttonContainer}>
        <Button title="Go Online" color="#fcd303" onPress={() => {}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonContainer: {
    backgroundColor: 'yellow',
    padding: 10,
    borderRadius: 20,
    margin: 20,
  }
});

export default MapScreen;
