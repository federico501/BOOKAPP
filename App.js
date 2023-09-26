import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './screens/WelcomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import CategorySelectionScreen from './screens/CategorySelectionScreen';
import HomeScreen from './screens/HomeScreen';
import SearchBooksScreen from './screens/SearchBooksScreen';
import UpdateAccountScreen from './screens/UpdateAccountScreen';
import AddBooksScreen from './screens/AddBooksScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} /> 
        <Stack.Screen name="Category" component={CategorySelectionScreen} /> 
        <Stack.Screen name="Home" component={HomeScreen} /> 
        <Stack.Screen name="SearchBooks" component={SearchBooksScreen} />
        <Stack.Screen name="UpdateAccount" component={UpdateAccountScreen} />
        <Stack.Screen name="AddBooks" component={AddBooksScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
