import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight } from 'react-native';
import supabase from '../../supabaseClient';
import { Colors } from '@/constants/Colors';

export default function EditProfilePage({ navigation, route }) {
  const { user } = route.params;
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const handleSave = async () => {
    const { error } = await supabase
      .from('profiles')
      .update({ name, email })
      .eq('id', user.id);

    if (error) {
      console.log('Update error:', error.message);
    } else {
      console.log('Profile updated successfully');
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
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
      <TouchableHighlight
        style={styles.saveButton}
        onPress={handleSave}
        underlayColor="white">
        <Text style={styles.buttonText}>Save</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FF6666',
    flex: 1,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: '90%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
  },
  saveButton: {
    height: 40,
    width: '90%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

