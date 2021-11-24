import React from "react";
import { UserContextProvider } from "./src/context/UserContext";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";

import Splash from "./src/screens/Splash";
import Welcome from "./src/screens/Welcome";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";

import MyTasks from "./src/screens/MyTasks";
import Profile from "./src/screens/Profile";

import DetailTodos from "./src/screens/DetailTodos";
import EditTodo from "./src/screens/EditTodo";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <UserContextProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MyTasks"
            component={MyTasks}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DetailTodos"
            component={DetailTodos}
            options={{ title: "Details Todos" }}
          />
          <Stack.Screen
            name="EditTodo"
            component={EditTodo}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TabNav"
            component={TabNav}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContextProvider>
  );
}

function TabNav() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === "MyTasks") {
            return <Ionicons name="ios-home" size={size} color={color} />;
          } else if (route.name === "Profile") {
            return <Ionicons name="ios-person" size={size} color={color} />;
          }
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="MyTasks" component={MyTasks} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
