import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screens/Home';
import {SearchScreen} from '../screens/Search';
import {MovieScreen} from '../screens/Movie';

const Tab = createBottomTabNavigator();

const HomeStack = createStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Movie" component={MovieScreen} />
    </HomeStack.Navigator>
  );
};

const SearchStack = createStackNavigator();

const SearchStackScreen = () => {
  return (
    <SearchStack.Navigator screenOptions={{headerShown: false}}>
      <SearchStack.Screen name="Serch" component={SearchScreen} />
      <SearchStack.Screen name="Movie" component={MovieScreen} />
    </SearchStack.Navigator>
  );
};

export const AppRoot = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Search" component={SearchStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
