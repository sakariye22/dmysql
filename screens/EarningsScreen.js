import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const EarningsScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>trips</Text>
      
      <View style={styles.filters}>
        <TouchableOpacity style={styles.filterButton}><Text>Today</Text></TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}><Text>7 days</Text></TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}><Text>30 days</Text></TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}><Text>Custom</Text></TouchableOpacity>
      </View>
      
      <View style={styles.tripList}>
        {/* You would map through your trips here */}
        <View style={styles.tripItem}>
          <Text style={styles.tripDetails}>Wed, Jan 5, 8:00 AM - 1.3 miles, 7 mins</Text>
          <Text style={styles.tripPrice}>$10</Text>
        </View>
        {/* ... other trip items */}
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Earnings</Text>
        <Text style={styles.amount}>$45</Text>
        <Text style={styles.description}>Total earnings</Text>
        <Text style={styles.amount}>$15</Text>
        <Text style={styles.description}>Avg. per trip</Text>
        <TouchableOpacity>
          <Text style={styles.linkText}>→</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Customer ratings</Text>
        <Text style={styles.amount}>100%</Text>
        <Text style={styles.description}>Rated 5 stars</Text>
        <TouchableOpacity>
          <Text style={styles.linkText}>→</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  filters: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  filterButton: {
    padding: 10,
  },
  tripList: {
    padding: 20,
  },
  tripItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tripDetails: {
    fontSize: 16,
  },
  tripPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  amount: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
  },
  description: {
    fontSize: 16,
    marginBottom: 5,
  },
  linkText: {
    fontSize: 16,
    color: '#0000ff',
    alignSelf: 'flex-end',
  },
});

export default EarningsScreen;
