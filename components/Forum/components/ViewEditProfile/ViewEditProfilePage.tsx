// ViewEditProfilePage.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default function ViewEditProfilePage({ route }) {
  const { userId } = route.params;
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const userDoc = await firestore().collection('users').doc(userId).get();
      if (userDoc.exists) {
        const userData = userDoc.data();
        setUser(userData);
        setName(userData.name);
        setEmail(userData.email);
        setAge(userData.age);
        setBio(userData.bio);
      }
    };

    fetchUser();
  }, [userId]);

  const handleSave = async () => {
    try {
      await firestore().collection('users').doc(userId).update({
        name,
        email,
        age,
        bio,
      });
      Alert.alert('Success', 'Profile updated successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile.');
    }
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit Profile</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Bio"
        value={bio}
        onChangeText={setBio}
        multiline
      />
      <Button title="Save" onPress={handleSave} />
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
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
