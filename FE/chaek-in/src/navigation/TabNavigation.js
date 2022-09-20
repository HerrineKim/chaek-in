import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RecommendScreen from '../screens/RecommendScreen';
import MeetingScreen from '../screens/MeetingScreen';
import HomeNavigation from './HomeNavigation';
import ReadScreen from '../screens/ReadScreen';
import RecordNavigation from './RecordNavigation';

const Tab = createBottomTabNavigator();

function TabNavigation() {
  return (
    // <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name='Home' component={HomeNavigation} options={{ headerShown: false }} />
      <Tab.Screen name='Recommend' component={RecommendScreen} />
      <Tab.Screen name='Read' component={ReadScreen} />
      <Tab.Screen name='Meeting' component={MeetingScreen} />
      <Tab.Screen name='Record' component={RecordNavigation} />
    </Tab.Navigator>
    // </NavigationContainer>
  );
}

export default TabNavigation;
