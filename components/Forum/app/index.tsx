import { Image, StyleSheet, Platform } from 'react-native';
import { View, Text } from 'react-native';
import LoginPage from '@/components/Login/LoginPage';
import RegistrationPage from '@/components/Registration/RegistrationPage';
import HomePage from '@/components/Home/HomePage';
import {NavigationContainer} from '@react-navigation/native';
// import MainStackNavigator from '@/components/navigation/MainStackNavigator';


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfilePage from '@/components/Profile/ProfilePage';
import ForumPage from '@/components/Forum/ForumPage';
import ProgressPage from '@/components/Progress/ProgressPage';
import MyStack from '@/components/navigation/MyStack';


const Tab = createBottomTabNavigator();
export default function HomeScreen() {
  return (
   
     <MyStack/>

  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
