import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LocationScreen from '../screens/LocationScreen';
import GiftScreen from '../screens/GiftScreen';
import PhotoScreen from '../screens/PhotoScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home${focused ? '' : '-outline'}`
          : 'md-home'
      }
    />
  ),
};

const LocationStack = createStackNavigator({
  Location: LocationScreen,
});

LocationStack.navigationOptions = {
  tabBarLabel: 'Dove',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-map${focused ? '' : '-outline'}` : 'md-map'}
    />
  ),
};

const GiftStack = createStackNavigator({
  Gift: GiftScreen,
});

GiftStack.navigationOptions = {
  tabBarLabel: 'Regalo',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-bowtie${focused ? '' : '-outline'}` : 'md-bowtie'}
    />
  ),
};

const PhotoStack = createStackNavigator({
  Photo: PhotoScreen,
});

PhotoStack.navigationOptions = {
  tabBarLabel: 'Foto',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-image${focused ? '' : '-outline'}` : 'md-image'}
    />
  ),
};


export default createBottomTabNavigator({
  HomeStack,
  LocationStack,
  GiftStack,
  PhotoStack,
},{
  tabBarOptions:{
    labelStyle: {color: '#ffe8f7'},
    inactiveBackgroundColor: '#e84a68',
    activeBackgroundColor: '#963044'
  }
});
