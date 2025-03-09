import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import supabase from '../../supabaseClient';
import { Colors } from '@/constants/Colors';

export default function ProfilePage() {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    const session = await supabase.auth.getSession();
    if (session.data.session) {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.data.session.user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
      } else {
        setUser(data);
      }
    }
  };

  const handleViewEditProfileClick = () => {
    if (user) {
      navigation.navigate('EditProfilePage', { user });
    }
  };

  const handlePersonalHistoryClick = () => {
    navigation.navigate('PersonalHistoryPage');
  };

  const handleSettingsClick = () => {
    navigation.navigate('SettingsPage');
  };

  const handleHelpClick = () => {
    navigation.navigate('HelpPage');
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error.message);
    } else {
      navigation.navigate('Login');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile Page</Text>
      {user ? (
        <>
          <TouchableOpacity style={styles.button} onPress={handleViewEditProfileClick}>
            <Text style={styles.buttonText}>View/Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handlePersonalHistoryClick}>
            <Text style={styles.buttonText}>Personal History</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleSettingsClick}>
            <Text style={styles.buttonText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleHelpClick}>
            <Text style={styles.buttonText}>Help</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
            <Text style={styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
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
  signOutButton: {
    backgroundColor: '#FF6666',
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
