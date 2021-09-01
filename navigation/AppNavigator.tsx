import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer, DrawerActions, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator,DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer';
import { useSelector,useDispatch  } from 'react-redux';

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



const DrawerNav = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <Drawer.Navigator initialRouteName="HomeScreen" drawerContent={props => {
      return (
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
          <DrawerItem label="Logout" onPress={() =>  dispatch(logout(navigation))} />
        </DrawerContentScrollView>
      )
    }}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="MyRecipe" component={MyRecipesScreen} />
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
            name="My Food Write-ups"
            component={DrawerNav}
            options={({ navigation }) => ({
              headerLeft: () => (
                <Ionicons
                  style={{ padding: 15 }}
                  name="menu"
                  size={30}
                  color="#000"
                  onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
                />
              ),
            })}
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