// ConsultationDetailsPage.js

import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '@/constants/Colors';

export default function ConsultationDetailsPage() {
  const [categories, setCategories] = useState({
    general: false,
    family: false,
    addiction: false,
    occupation: false,
    health: false,
    loss: false,
  });

  const [preferences, setPreferences] = useState({
    videoCall: false,
    voiceCall: false,
    femaleDoctor: false,
    maleDoctor: false,
    allowAccessHistory: false,
  });

  const navigation = useNavigation();

  const handleCategoryToggle = (category) => {
    setCategories({ ...categories, [category]: !categories[category] });
  };

  const handlePreferenceToggle = (preference) => {
    setPreferences({ ...preferences, [preference]: !preferences[preference] });
  };

  const handleNext = () => {
    // Navigate to therapist search page with parameters
    navigation.navigate('TherapistSearchPage', {
      categories: categories,
      preferences: preferences,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Consultation Details</Text>
      <Text style={styles.sectionHeader}>Categories</Text>
      <View style={styles.checkboxContainer}>
        {Object.keys(categories).map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.checkbox, { backgroundColor: categories[category] ? '#ADD8E6' : '#FFFFFF' }]}
            onPress={() => handleCategoryToggle(category)}
          >
            <Text style={styles.checkboxText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.sectionHeader}>Preferences</Text>
      <View style={styles.checkboxContainer}>
        {Object.keys(preferences).map((preference, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.checkbox, { backgroundColor: preferences[preference] ? '#ADD8E6' : '#FFFFFF' }]}
            onPress={() => handlePreferenceToggle(preference)}
          >
            <Text style={styles.checkboxText}>{preference}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next</Text>
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
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: Colors.BLACK,
  },
  checkboxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  checkbox: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: Colors.BLACK,
    borderRadius: 10,
    padding: 10,
    margin: 5,
  },
  checkboxText: {
    color: Colors.BLACK,
  },
  nextButton: {
    backgroundColor: '#ADD8E6',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
    width: '100%',
  },
  nextButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

