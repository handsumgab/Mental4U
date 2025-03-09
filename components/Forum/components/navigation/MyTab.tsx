import { View, Text, StyleSheet,Image } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfilePage from '@/components/Profile/ProfilePage';
import ForumPage from '@/components/Forum/ForumPage';
import ProgressPage from '@/components/Progress/ProgressPage';
import HomePage from '../Home/HomePage';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';

const Tab = createBottomTabNavigator();

export default function MyTab() {
  return (
     <Tab.Navigator 
     screenOptions={{ headerShown: false}}
     >

      <Tab.Screen name="Home" component={HomePage}
       options={{
        title: 'Home',
        tabBarIcon: ({size,focused,color}) => {
          return (
            <Image
              style={{ width: 30, height: 30 }}
             source={require('@/assets/images/home.png')} 
            />
          );
        },
      }}
    />

      <Tab.Screen
          name="Progress"
          component={ProgressPage}
          options={{
            title: 'Progress',
            tabBarIcon: ({size,focused,color}) => {
              return (
                <Image
                  style={{ width: 30, height: 30 }}
                 source={require('@/assets/images/progress.png')} 
                />
              );
            },
          }}
        />

      <Tab.Screen name="Forum" component={ForumPage}
      options={{
        title: 'Forum',
        tabBarIcon: ({size,focused,color}) => {
          return (
            <Image
              style={{ width: 30, height: 30 }}
             source={require('@/assets/images/forum.png')} 
            />
          );
        },
      }} />
      <Tab.Screen name="Profile" component={ProfilePage} 
      options={{
        title: 'Profile',
        tabBarIcon: ({size,focused,color}) => {
          return (
            <Image
              style={{ width: 30, height: 30 }}
             source={require('@/assets/images/profile.png')} 
            />
          );
        },
      }}/>

    </Tab.Navigator>
  )
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
  