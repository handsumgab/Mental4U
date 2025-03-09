import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, TextInput, Alert } from 'react-native';
import supabase from '../../supabaseClient';
import { Colors } from '@/constants/Colors';

export default function SettingsPage({ navigation }) {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
  const toggleNotifications = () => setIsNotificationsEnabled(previousState => !previousState);

  const handleChangePassword = async () => {
    // Change password logic here (depends on your auth setup)
    if (newPassword.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long.');
      return;
    }
    // Assuming you have a function to update password in supabase
    const { error } = await supabase.auth.update({
      password: newPassword
    });

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      Alert.alert('Success', 'Password updated successfully.');
    }
  };

  const handlePrivacyPolicy = () => {
    // Navigate to a Privacy Policy page or show a modal
    Alert.alert('Privacy Policy', 'Your Data is Secure. Do Not Worry');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Notifications</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isNotificationsEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleNotifications}
          value={isNotificationsEnabled}
        />
      </View>

      <View style={styles.settingItem}>
        <TextInput
          style={styles.input}
          placeholder="Current Password"
          value={currentPassword}
          onChangeText={setCurrentPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.settingItem} onPress={handlePrivacyPolicy}>
        <Text style={styles.settingText}>Privacy Policy</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.WHITE,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Colors.BLACK,
    textAlign: 'center',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  settingText: {
    fontSize: 18,
    color: Colors.BLACK,
  },
  input: {
    height: 40,
    width: '100%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: Colors.LIGHT_GREY,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#ADD8E6',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
