import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '@/constants/Colors';

const mockTherapists = [
  { id: 1, name: 'Dr. John Doe', specialty: 'General', gender: 'Male', phone: '123-456-7890', schedule: [{ day: 'Monday', time: '9:00 AM - 5:00 PM' }] },
  { id: 2, name: 'Dr. Jane Smith', specialty: 'Family', gender: 'Female', phone: '234-567-8901', schedule: [{ day: 'Tuesday', time: '10:00 AM - 6:00 PM' }] },
  { id: 3, name: 'Dr. Michael Johnson', specialty: 'Addiction', gender: 'Male', phone: '345-678-9012', schedule: [{ day: 'Wednesday', time: '8:00 AM - 4:00 PM' }] },
  { id: 4, name: 'Dr. Emily White', specialty: 'Occupation', gender: 'Female', phone: '456-789-0123', schedule: [{ day: 'Thursday', time: '11:00 AM - 7:00 PM' }] },
  { id: 5, name: 'Dr. David Brown', specialty: 'Health', gender: 'Male', phone: '567-890-1234', schedule: [{ day: 'Friday', time: '7:00 AM - 3:00 PM' }] },
  { id: 6, name: 'Dr. Sarah Green', specialty: 'General', gender: 'Female', phone: '678-901-2345', schedule: [{ day: 'Monday', time: '9:00 AM - 5:00 PM' }] },
  { id: 7, name: 'Dr. Kevin Black', specialty: 'Family', gender: 'Male', phone: '789-012-3456', schedule: [{ day: 'Tuesday', time: '10:00 AM - 6:00 PM' }] },
  { id: 8, name: 'Dr. Laura Grey', specialty: 'Addiction', gender: 'Female', phone: '890-123-4567', schedule: [{ day: 'Wednesday', time: '8:00 AM - 4:00 PM' }] },
  { id: 9, name: 'Dr. James Blue', specialty: 'Occupation', gender: 'Male', phone: '901-234-5678', schedule: [{ day: 'Thursday', time: '11:00 AM - 7:00 PM' }] },
  { id: 10, name: 'Dr. Emma Red', specialty: 'Health', gender: 'Female', phone: '012-345-6789', schedule: [{ day: 'Friday', time: '7:00 AM - 3:00 PM' }] },
  { id: 11, name: 'Dr. Olivia Brown', specialty: 'Loss', gender: 'Female', phone: '123-456-7891', schedule: [{ day: 'Monday', time: '10:00 AM - 6:00 PM' }] },
  { id: 12, name: 'Dr. Liam White', specialty: 'General', gender: 'Male', phone: '234-567-8902', schedule: [{ day: 'Tuesday', time: '9:00 AM - 5:00 PM' }] },
  { id: 13, name: 'Dr. Sophia Black', specialty: 'Family', gender: 'Female', phone: '345-678-9013', schedule: [{ day: 'Wednesday', time: '8:00 AM - 4:00 PM' }] },
  { id: 14, name: 'Dr. Noah Green', specialty: 'Addiction', gender: 'Male', phone: '456-789-0124', schedule: [{ day: 'Thursday', time: '11:00 AM - 7:00 PM' }] },
  { id: 15, name: 'Dr. Isabella Grey', specialty: 'Occupation', gender: 'Female', phone: '567-890-1235', schedule: [{ day: 'Friday', time: '7:00 AM - 3:00 PM' }] },
  { id: 16, name: 'Dr. Mason Blue', specialty: 'Health', gender: 'Male', phone: '678-901-2346', schedule: [{ day: 'Monday', time: '9:00 AM - 5:00 PM' }] },
  { id: 17, name: 'Dr. Mia Red', specialty: 'Loss', gender: 'Female', phone: '789-012-3457', schedule: [{ day: 'Tuesday', time: '10:00 AM - 6:00 PM' }] },
  { id: 18, name: 'Dr. Jacob White', specialty: 'General', gender: 'Male', phone: '890-123-4568', schedule: [{ day: 'Wednesday', time: '8:00 AM - 4:00 PM' }] },
  { id: 19, name: 'Dr. Amelia Black', specialty: 'Family', gender: 'Female', phone: '901-234-5679', schedule: [{ day: 'Thursday', time: '11:00 AM - 7:00 PM' }] },
  { id: 20, name: 'Dr. Ethan Green', specialty: 'Addiction', gender: 'Male', phone: '012-345-6780', schedule: [{ day: 'Friday', time: '7:00 AM - 3:00 PM' }] },
  { id: 21, name: 'Dr. Harper Grey', specialty: 'Occupation', gender: 'Female', phone: '123-456-7892', schedule: [{ day: 'Monday', time: '9:00 AM - 5:00 PM' }] },
  { id: 22, name: 'Dr. Alexander Blue', specialty: 'Health', gender: 'Male', phone: '234-567-8903', schedule: [{ day: 'Tuesday', time: '10:00 AM - 6:00 PM' }] },
  { id: 23, name: 'Dr. Evelyn Red', specialty: 'Loss', gender: 'Female', phone: '345-678-9014', schedule: [{ day: 'Wednesday', time: '8:00 AM - 4:00 PM' }] },
  { id: 24, name: 'Dr. Aiden White', specialty: 'General', gender: 'Male', phone: '456-789-0125', schedule: [{ day: 'Thursday', time: '11:00 AM - 7:00 PM' }] },
  { id: 25, name: 'Dr. Ella Black', specialty: 'Family', gender: 'Female', phone: '567-890-1236', schedule: [{ day: 'Friday', time: '7:00 AM - 3:00 PM' }] },
  { id: 26, name: 'Dr. Lucas Green', specialty: 'Addiction', gender: 'Male', phone: '678-901-2347', schedule: [{ day: 'Monday', time: '9:00 AM - 5:00 PM' }] },
  { id: 27, name: 'Dr. Avery Grey', specialty: 'Occupation', gender: 'Female', phone: '789-012-3458', schedule: [{ day: 'Tuesday', time: '10:00 AM - 6:00 PM' }] },
  { id: 28, name: 'Dr. Henry Blue', specialty: 'Health', gender: 'Male', phone: '890-123-4569', schedule: [{ day: 'Wednesday', time: '8:00 AM - 4:00 PM' }] },
  { id: 29, name: 'Dr. Lily Red', specialty: 'Loss', gender: 'Female', phone: '901-234-5670', schedule: [{ day: 'Thursday', time: '11:00 AM - 7:00 PM' }] },
  { id: 30, name: 'Dr. Jackson White', specialty: 'General', gender: 'Male', phone: '012-345-6781', schedule: [{ day: 'Friday', time: '7:00 AM - 3:00 PM' }] },
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
            <Text>{item.phone}</Text>
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
