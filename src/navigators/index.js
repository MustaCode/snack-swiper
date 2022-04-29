import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import {
    CreateGroup,
    InviteFriends
} from '../screens'

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="CreateGroup" component={CreateGroup} />
        <Stack.Screen name="InviteFriends" component={InviteFriends} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export const Navigator = () => AppNavigator();