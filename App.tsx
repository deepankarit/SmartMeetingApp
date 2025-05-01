import React, {useContext} from 'react';
import {NavigationContainer, ThemeProvider} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthContext, AuthProvider} from './src/context/AuthContext';
import LoginScreen from './src/screens/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import AddMeetingScreen from './src/screens/AddMeetingScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import {SnackbarProvider} from './src/context/SnackbarContext';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {TestScreen} from './src/screens/TestScreen';
import LogScreen from './src/screens/testing/LogScreen';
import {ThemesProvider} from './src/screens/testing/ThemeContext';

const Stack = createStackNavigator();

function RootNavigator() {
  const {token} = useContext(AuthContext);

  return (
    <Stack.Navigator>
      {token == null ? (
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{headerShown: false}}
          />
        </>
      ) : (
        <>
          {/* <Stack.Screen
            name="LogScreen"
            component={LogScreen}
            options={{headerShown: false}}
          /> */}
          <Stack.Screen
            name="Dashboard"
            component={DashboardScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AddMeeting"
            component={AddMeetingScreen}
            options={{headerShown: true}}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <SnackbarProvider>
        <AuthProvider>
          <ThemesProvider>
            <NavigationContainer>
              <RootNavigator />
            </NavigationContainer>
          </ThemesProvider>
        </AuthProvider>
      </SnackbarProvider>
    </SafeAreaProvider>
  );
}
