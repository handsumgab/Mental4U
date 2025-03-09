// TherapistSearchPage.js

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '@/constants/Colors';

const mockTherapists = [
  { id: 1, name: 'Dr. John Doe', specialty: 'General', gender: 'Male', schedule: [{ day: 'Monday', time: '9:00 AM - 5:00 PM' }] },
  { id: 2, name: 'Dr. Jane Smith', specialty: 'Family', gender: 'Female', schedule: [{ day: 'Tuesday', time: '10:00 AM - 6:00 PM' }] },
  { id: 3, name: 'Dr. Michael Johnson', specialty: 'Addiction', gender: 'Male', schedule: [{ day: 'Wednesday', time: '8:00 AM - 4:00 PM' }] },
  { id: 4, name: 'Dr. Emily White', specialty: 'Occupation', gender: 'Female', schedule: [{ day: 'Thursday', time: '11:00 AM - 7:00 PM' }] },
  { id: 5, name: 'Dr. David Brown', specialty: 'Health', gender: 'Male', schedule: [{ day: 'Friday', time: '7:00 AM - 3:00 PM' }] },
];

export default function TherapistSearchPage({ route }) {
  const { categories, preferences } = route.params;
  const [searchQuery, setSearchQuery] = useState('');
  const [recommendedTherapists, setRecommendedTherapists] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // Filter therapists based on categories and preferences
    const filteredTherapists = mockTherapists.filter((therapist) => {
      return (
        (categories[therapist.specialty.toLowerCase()] || categories.general) &&
        (preferences.femaleDoctor ? therapist.gender === 'Female' : true) &&
        (preferences.maleDoctor ? therapist.gender === 'Male' : true)
      );
    });

    setRecommendedTherapists(filteredTherapists);
  }, [categories, preferences]);

  const handleTherapistSelect = (therapist) => {
    navigation.navigate('TherapistDetailsPage', { therapist });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search Therapists"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Text style={styles.recommendedText}>Recommended Therapists</Text>
      <FlatList
        data={recommendedTherapists}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.therapistItem} onPress={() => handleTherapistSelect(item)}>
            <Text>{item.name}</Text>
            <Text>{item.specialty}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  recommendedText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.BLACK,
  },
  therapistItem: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
});
