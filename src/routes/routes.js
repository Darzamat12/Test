import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

import {HomeScreen} from '../screens/Home';
import {SearchScreen} from '../screens/Search';
import {MovieScreen} from '../screens/Movie';

const Tab = createBottomTabNavigator();

const SearchStack = createStackNavigator();

const SharedElementStack = createSharedElementStackNavigator();

const HomeSharedElementStackNavigator = () => {
  return (
    <SharedElementStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <SharedElementStack.Screen name="Home" component={HomeScreen} />
      <SharedElementStack.Screen
        name="Movie"
        component={MovieScreen}
        options={{
          useNativeDriver: true,

          transitionSpec: {
            open: {
              animation: 'timing',
              config: {
                stiffness: 1000,
                damping: 500,
                mass: 3,
                overshootClamping: true,
                restDisplacementThreshold: 10,
                restSpeedThreshold: 10,
                duration: 1000,
              },
            },
            close: {
              animation: 'timing',
              config: {
                stiffness: 1000,
                damping: 500,
                mass: 3,
                overshootClamping: true,
                restDisplacementThreshold: 10,
                restSpeedThreshold: 10,
                duration: 500,
              },
            },
          },
          cardStyleInterpolator: ({current: {progress}}) => ({
            cardStyle: {
              opacity: progress,
            },
          }),
        }}
        sharedElementsConfig={(route, otherRoute, showing) => {
          const {movie, genre} = route.params;

          return [
            {
              id: `item.${movie.id}${genre}.image`,
            },
          ];
        }}
      />
    </SharedElementStack.Navigator>
  );
};

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
        <Tab.Screen name="Home" component={HomeSharedElementStackNavigator} />
        <Tab.Screen name="Search" component={SearchStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
