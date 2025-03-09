import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '@/constants/Colors';

export default function HomePage({ userName }) {
  const navigation = useNavigation();

  const handleConsultationClick = () => {
    navigation.navigate('Profile');
  };

  const handleScheduleClick = () => {
    navigation.navigate('ConsultationDetailsPage'); // Navigate to ConsultationDetailsPage for now
  };

  const handleProgressClick = () => {
    navigation.navigate('Progress'); // Navigate
  };

  const handleForumClick = () => {
    navigation.navigate('Forum'); // Navigate
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.mainHeader}>Mental4U</Text>
        <Text style={styles.greeting}>Welcome to Mental4u {userName}</Text>
      </View>
      <Text style={styles.text}>Home</Text>
      <View style={styles.gridContainer}>

        <TouchableOpacity style={styles.button} onPress={handleScheduleClick}>
          <Text style={styles.buttonText}>Find a Suitable Doctor for YOU!</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleProgressClick}>
          <Text style={styles.buttonText}>How are You Feeling Today?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleForumClick}>
          <Text style={styles.buttonText}>Share and Learn with Like-minded Individuals!</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleConsultationClick}>
          <Text style={styles.buttonText}>Visit Your Profile!</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.header}>About Us</Text>
      <Text style={styles.paragraph}>
        In this day and age, mental health is becoming a stronger issue and we want to provide a service to help those in need of mental health care.
        {'\n'}Our aim is to allow anyone facing mental health issues to find an expert on mental health to talk to with just one click.
      </Text>
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
  headerContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  mainHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.BLACK,
  },
  greeting: {
    fontSize: 16,
    color: Colors.BLACK,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: Colors.BLACK,
    marginBottom: 20, 
    marginTop: 80, 
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    width: '40%',
    height: 100,
    backgroundColor: '#ADD8E6', // Lighter shade of blue
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    padding: 10, 
    borderRadius: 10, 
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
    color: Colors.BLACK,
  },
  paragraph: {
    fontSize: 16,
    textAlign: 'center',
    color: Colors.BLACK,
  },
});
