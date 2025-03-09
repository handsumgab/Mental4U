// TherapistDetailsPage.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

export default function TherapistDetailsPage({ route }) {
  const { therapist } = route.params;

  const therapistSchedule = therapist.schedule || [];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{therapist.name}</Text>
      <Text style={styles.subheader}>Specialty: {therapist.specialty}</Text>
      <Text style={styles.sectionHeader}>Availability</Text>
      <View style={styles.scheduleContainer}>
        {therapistSchedule.length > 0 ? (
          therapistSchedule.map((scheduleItem, index) => (
            <View key={index} style={styles.scheduleItem}>
              <Text>{scheduleItem.day}</Text>
              <Text>{scheduleItem.time}</Text>
            </View>
          ))
        ) : (
          <Text>No schedule available</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.BLACK,
    marginBottom: 10,
  },
  subheader: {
    fontSize: 18,
    color: Colors.BLACK,
    marginBottom: 10,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.BLACK,
    marginTop: 20,
    marginBottom: 10,
  },
  scheduleContainer: {
    marginTop: 10,
  },
  scheduleItem: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
});
