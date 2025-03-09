import { View, Text } from 'react-native'
import React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginPage from '../Login/LoginPage';
import HomePage from '../Home/HomePage';
import RegistrationPage from '../Registration/RegistrationPage';
import MyTab from './MyTab';
import ConsultationDetailsPage from '../Consultation/ConsultationDetailsPage';
import TherapistSearchPage from '../TherapistSearch/TherapistSearchPage';
import TherapistDetailsPage from '../TherapistDetails/TherapistDetailsPage';
import EditProfilePage from '../EditProfile/EditProfilePage'
import PersonalHistoryPage from '../Profile/PersonalHistoryPage'
import SettingsPage from '../Profile/SettingsPage'
import HelpPage from '../Profile/HelpPage'


const Stack = createNativeStackNavigator();

export default function MyStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true}}>
        <Stack.Screen
          name="Login"
          component={LoginPage}
         options={{ headerShown: true,  title: 'Login'}}
        />
        
        <Stack.Screen
          name="Home"
          component={HomePage}
         options={{ headerShown: true,  title: 'Home'}}
        />

        <Stack.Screen 
        name="RegistrationPage" 
        component={RegistrationPage} 
        options={{ headerBackVisible: true ,title: 'Registration' }}
        />

       <Stack.Screen 
        name="tabHome" 
        component={MyTab} 
        options={{ headerBackVisible: true ,title: '' }}
        />

        <Stack.Screen 
          name="ConsultationDetailsPage" 
          component={ConsultationDetailsPage} 
          options={{ title: 'Consultation Details' }} // Customize as needed
        />

        <Stack.Screen 
          name="TherapistSearchPage" 
          component={TherapistSearchPage} 
          options={{ title: 'Therapist Search' }} // Customize as needed
        />

        <Stack.Screen 
          name="TherapistDetailsPage" 
          component={TherapistDetailsPage} 
          options={{ title: 'Therapist Details' }} 
        />
                
        <Stack.Screen 
          name="EditProfilePage" 
          component={EditProfilePage} 
          options={{ title: 'Edit Profile' }} 
        />

        <Stack.Screen 
          name="PersonalHistoryPage" 
          component={PersonalHistoryPage} 
          options={{ title: 'Personal History' }} 
        />

        <Stack.Screen 
          name="SettingsPage" 
          component={SettingsPage} 
          options={{ title: 'Settings' }} 
        />

        <Stack.Screen 
          name="HelpPage" 
          component={HelpPage} 
          options={{ title: 'Help' }} 
        />
      </Stack.Navigator>
    
  );
}