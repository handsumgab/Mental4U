import { View, Text } from 'react-native'
import React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginPage from '../Login/LoginPage';
import HomePage from '../Home/HomePage';
import RagistrationPage from '../Registration/RegistrationPage';
import MyTab from './MyTab';
import ConsultationDetailsPage from '../Consultation/ConsultationDetailsPage';
import TherapistSearchPage from '../TherapistSearch/TherapistSearchPage';
import TherapistDetailsPage from '../TherapistDetails/TherapistDetailsPage';


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
        name="Register" 
        component={RagistrationPage} 
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
      </Stack.Navigator>
    
  );
}