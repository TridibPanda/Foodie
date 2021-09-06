import React from 'react';
import {
  Image,
  TouchableOpacity,
  Text,
  View
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
import PostRecipeScreen from '../screens/PostRecipeScreen';
import RecipeDetailsScreen from '../screens/RecipeDetailsScreen';
import MyProfileScreen from '../screens/MyProfileScreen';
import ProfileScreen from '../screens/ProfileScreen';

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
// Profile stack
const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='MyProfileScreen'
        component={MyProfileScreen}
        options={({ navigation }) => ({
          title: 'Profile',
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

// Drawer
const DrawerNav = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.auth.data);

  return (
    <Drawer.Navigator initialRouteName="HomeStack" drawerContent={props => {
      return (
        <DrawerContentScrollView {...props} >
          <Image source={{ uri: 'https://media.istockphoto.com/photos/chicken-fried-rice-picture-id945606006' }} style={{ height: 150 }} />
          <View style={{alignItems:'center',margin:10}}>
                <Image style={{
                  height: 100,
                  width: 100,
                  borderRadius: 10,
                  borderWidth:2,
                  overflow:'hidden',
                  borderColor:'#ccc',
                }} source={{ uri: userData.image ? userData.image : 'https://icon-library.com/images/default-user-icon/default-user-icon-20.jpg' }} />
                <Text style={{fontSize:20,color:'#000',textAlign:'center'}}>{userData.name}</Text>
              </View>
          <DrawerItemList {...props}/>
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
      <Drawer.Screen name="PostRecipeScreen" component={PostRecipeScreen} options={{
        title: 'Post Recipe',
        drawerIcon: ({ focused, size }) => (
          <Ionicons
            name="add-circle"
            size={size}
            color={focused ? '#2759d9' : '#ccc'}
          />
        ),
      }} />
      <Drawer.Screen name="Profile" component={ProfileStack} options={{
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
  const recipe = useSelector((state: any) => state.recipes.recipe);
  const userProfile = useSelector((state: any) => state.auth.userProfile);

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
        <Stack.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={({ route }) => ({
                  title: userProfile.name,
                })}
              />
              <Stack.Screen
          name="RecipeDetailsScreen"
          component={RecipeDetailsScreen}
          options={({ route,navigation }) => ({
            title: recipe.type,
            
            headerRight: () => (
              <TouchableOpacity onPress={()=> navigation.navigate('ProfileScreen') }>
                <Image style={{
                  height: 40,
                  width: 40,
                  padding: 15,
                  marginRight: 20,
                  borderRadius: 10,
                  borderWidth:2,
                  borderColor:'#ccc',
                }} source={{ uri: userProfile.image ? userProfile.image : 'https://icon-library.com/images/default-user-icon/default-user-icon-20.jpg' }} />
              </TouchableOpacity>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );

}
export default AppNavigator;