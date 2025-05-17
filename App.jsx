/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import Home from './src/navigation-screens/Home';
import Login from './src/navigation-screens/Login';
import Dashboard from './src/navigation-screens/Dashboard';
import Register from './src/navigation-screens/Register';
import Details from './src/navigation-screens/Details';
import DetailsPage2 from './src/navigation-screens/DetailsPage2';
import WardenDashboard from './src/navigation-screens/WardenDashboard';
import AttendancePage from './src/navigation-screens/AttendancePage';
import ComplaintPage from './src/navigation-screens/ComplaintPage';
import MessPage from './src/navigation-screens/MessPage';
import FeesPage from './src/navigation-screens/FeesPage';
import PassActivityPage from './src/navigation-screens/PassActivityPage';
import BookingSlot from './src/navigation-screens/BookingSlot';



// import First from './src/navigation-screens/First';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="WardenDashboard"
          component={WardenDashboard}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DetailsPage2"
          component={DetailsPage2}
          options={{headerShown: false}}
        />
        <Stack.Screen
        name="AttendancePage"
        component={AttendancePage}
        options={{headerShown:false}}/>
        <Stack.Screen
        name="ComplaintPage"
        component={ComplaintPage}
        options={{headerShown:false}}/>
        <Stack.Screen
        name="MessPage"
        component={MessPage}
        options={{headerShown:false}}/>
        <Stack.Screen
        name="FeesPage"
        component={FeesPage}
        options={{headerShown:false}}/>
        <Stack.Screen
        name="PassActivityPage"
        component={PassActivityPage}
        options={{headerShown:false}}
        />
        <Stack.Screen
        name="BookingSlot"
        component={BookingSlot}
        options={{headerShown:false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
