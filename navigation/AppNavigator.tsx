import React from 'react';
import {
  Image,
  TouchableOpacity,
  Text
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { useSelector, useDispatch } from 'react-redux';

import { logout } from '../store/actions/Auth';

import DefaultScreen from '../screens/DefaultScreen';
import InitialScreen from '../screens/InitialScreen';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import HomeScreen from '../screens/HomeScreen';
import MyRecipesScreen from '../screens/MyRecipesScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Home stack
const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='HomeScreen'
        component={HomeScreen}
        options={({ navigation }) => ({
          title: 'My Food Write-ups',
          headerLeft: () => (
            <Ionicons
              style={{ padding: 15 }}
              name="ios-list"
              size={30}
              color="#000"
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            />
          ),
          headerRight: () => (
            <Ionicons
              style={{ padding: 15 }}
              name="search"
              size={25}
              color="#000"
              onPress={() => alert("Hi")}
            />
          ),
        })}
      />
    </Stack.Navigator>
  )
};

// My Recipes stack
const MyrecipesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='MyRecipesScreen'
        component={MyRecipesScreen}
        options={({ navigation }) => ({
          title: 'My Recipes',
          headerLeft: () => (
            <Ionicons
              style={{ padding: 15 }}
              name="ios-list"
              size={30}
              color="#000"
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            />
          ),
          headerRight: () => (
            <Ionicons
              style={{ padding: 15 }}
              name="search"
              size={25}
              color="#000"
              onPress={() => alert("Hi")}
            />
          ),
        })}
      />
    </Stack.Navigator>
  )
}

// Drawer
const DrawerNav = () => {
  const dispatch = useDispatch();

  return (
    <Drawer.Navigator initialRouteName="HomeStack" drawerContent={props => {
      return (
        <DrawerContentScrollView {...props} style={{ }}>
          <Image source={{ uri: 'https://media.istockphoto.com/photos/chicken-fried-rice-picture-id945606006' }} style={{ height: 200 }} />
          <DrawerItemList {...props} />
          <TouchableOpacity style={{ flexDirection: 'row', margin: 15 }} onPress={() => dispatch(logout())}>
            <Text style={{ color: '#ccc', fontSize: 15 }}>Log-out</Text>
            <Ionicons
              style={{ paddingLeft: 5 }}
              name="exit-outline"
              size={20}
              color="#ccc"
            />
          </TouchableOpacity>
        </DrawerContentScrollView>
      )
    }}>
      <Drawer.Screen name="Home" component={HomeStack} options={{
        title: 'Home',
        drawerIcon: ({ focused, size }) => (
          <Ionicons
            name="md-home"
            size={size}
            color={focused ? '#2759d9' : '#ccc'}
          />
        ),
      }} />
      <Drawer.Screen name="MyRecipesScreen" component={MyrecipesStack} options={{
        title: 'My Recipes',
        drawerIcon: ({ focused, size }) => (
          <Ionicons
            name="list-circle-outline"
            size={size}
            color={focused ? '#2759d9' : '#ccc'}
          />
        ),
      }} />
      <Drawer.Screen name="Add Recipe" component={MyrecipesStack} options={{
        title: 'Add Recipe',
        drawerIcon: ({ focused, size }) => (
          <Ionicons
            name="add"
            size={size}
            color={focused ? '#2759d9' : '#ccc'}
          />
        ),
      }} />
      <Drawer.Screen name="Profile" component={MyrecipesStack} options={{
        title: 'Profile',
        drawerIcon: ({ focused, size }) => (
          <Ionicons
            name="ios-person"
            size={size}
            color={focused ? '#2759d9' : '#ccc'}
          />
        ),
      }} />
    </Drawer.Navigator>
  )
}

const AppNavigator = () => {

  const userId = useSelector((state: any) => state.auth.uid);
  const isloggedIn = useSelector((state: any) => state.auth.isloggedIn);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userId ?
          <Stack.Screen
            name='DrawerNav'
            component={DrawerNav}
            options={{ headerShown: false }}
          />
          : !isloggedIn ? <Stack.Screen
            name="DefaultScreen"
            component={DefaultScreen}
            options={{ headerShown: false }}
          /> :
            <>
              <Stack.Screen
                name="InitialScreen"
                component={InitialScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SignupScreen"
                component={SignupScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ForgotPasswordScreen"
                component={ForgotPasswordScreen}
                options={{ headerShown: false }}
              />
            </>
        }
      </Stack.Navigator>
    </NavigationContainer>
  );

}
export default AppNavigator;