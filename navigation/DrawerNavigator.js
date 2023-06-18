import React from "react";
import { Text, Button, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createDrawerNavigator, DrawerToggleButton } from "@react-navigation/drawer";
import TabNavigator from "./TabNavigator";
import ProfileStackNavigator from "./ProfileStackNavigator";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
  <Drawer.Navigator
    screenOptions={{
      headerTintColor: "#7878F5",
      title: "",
      headerStyle: {
        backgroundColor: "#1C1C1E",
      },
      drawerStyle: {
        backgroundColor: "#1C1C1E",
      },
    }}
  >
    <Drawer.Screen
      name="Home"
      component={TabNavigator}
      options={({ navigation, route }) => ({
        headerRight: () => (
          <TouchableOpacity 
          onPress={() => navigation.navigate('Profile')}>
            <Ionicons name="person" size={24} color="#7878F5" style={{ marginRight: 10 }}/>
          </TouchableOpacity>
          
        ),
        drawerIcon: ({ focused, size }) => <Ionicons name="home" color={focused ? "#7878F5" : "#666666"} size={size} />,
        drawerLabel: ({ focused }) => <Text style={{ color: focused ? "#7878F5" : "#666666" }}>Home</Text>,
      })}
    />
    <Drawer.Screen name="Profile" component={ProfileStackNavigator} 
    options={({ navigation, route }) => ({
      drawerItemStyle: { height: 0 },
      headerLeft: () => (
         <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="ios-arrow-back-outline" size={32} color="#7878F5" style={{ marginLeft: 5, marginBottom: 5}}/>
         </TouchableOpacity>
      ),
      drawerIcon: ({ focused, size }) => <Ionicons name="home" color={focused ? "#7878F5" : "#666666"} size={size} />,
      drawerLabel: ({ focused }) => <Text style={{ color: focused ? "#7878F5" : "#666666" }}>Inicio</Text>,
    })}/>
  </Drawer.Navigator>
);

export default DrawerNavigator;
