import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screens/Home';
import {SearchScreen} from '../screens/Search';
import {MovieScreen} from '../screens/Movie';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

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
export const iosTransitionSpec = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 10,
    restSpeedThreshold: 10,
  },
};

const SearchStack = createStackNavigator();

const SharedElementStack = createSharedElementStackNavigator();

function HomeSharedElementStackNavigator({navigation}) {
  return (
    <SharedElementStack.Navigator
      screenOptions={{
        transitionSpec: {
          open: {animation: 'timing', config: {duration: 1000}},
          close: {animation: 'timing', config: {duration: 500}},
        },
        cardStyleInterpolator: ({current: {progress}}) => ({
          cardStyle: {
            opacity: progress,
          },
        }),
        headerShown: false,
      }}>
      <SharedElementStack.Screen name="Home" component={HomeScreen} />
      <SharedElementStack.Screen
        name="Movie"
        component={MovieScreen}
        sharedElementsConfig={(route, otherRoute, showing) => {
          const {movie} = route.params;
          if (route.name === 'Movie' && showing) {
            return [
              {
                id: `item.${movie.id}.image`,
              },
            ];
          }
        }}
      />
    </SharedElementStack.Navigator>
  );
}

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
