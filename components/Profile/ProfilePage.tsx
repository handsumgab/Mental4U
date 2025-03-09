import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';

export default function ProfilePage() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile Page</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>View/Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Personal History</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Previous Consultations</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Policy</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Help</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Colors.BLACK,
  },
  button: {
    backgroundColor: '#ADD8E6',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
