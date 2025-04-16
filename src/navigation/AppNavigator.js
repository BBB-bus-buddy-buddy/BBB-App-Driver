// src/navigation/AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import AdditionalInfoScreen from '../screens/AdditionalInfoScreen';
import HomeScreen from '../screens/HomeScreen';
import StartDriveScreen from '../screens/StartDriveScreen';
import DrivingScreen from '../screens/DrivingScreen';
import EndDriveScreen from '../screens/EndDriveScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import MessageScreen from '../screens/MessageScreen';
import ProfileScreen from '../screens/ProfileScreen';

// 스택 네비게이터 생성
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="AdditionalInfo" component={AdditionalInfoScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="StartDrive" component={StartDriveScreen} />
      <Stack.Screen name="Driving" component={DrivingScreen} />
      <Stack.Screen name="EndDrive" component={EndDriveScreen} />
      <Stack.Screen name="Schedule" component={ScheduleScreen} />
      <Stack.Screen name="Message" component={MessageScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;