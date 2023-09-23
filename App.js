import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Screen_uno from './screens/Screen_uno'; // Importa la pantalla de bienvenida
import Screen_dos from './screens/Screen_dos'; // Importa la pantalla principal

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Screen_uno">
        <Stack.Screen name="Screen_uno" component={WelcomeScreen} />
        <Stack.Screen name="Screen_dos" component={PrincipalScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
