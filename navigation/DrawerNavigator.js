import React from "react";
import { Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import TabNavigator from "./TabNavigator";

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
      options={{
        drawerIcon: ({ focused, size }) => <Ionicons name="home" color={focused ? "#7878F5" : "#666666"} size={size} />,
        drawerLabel: ({ focused }) => <Text style={{ color: focused ? "#7878F5" : "#666666" }}>Home</Text>,
      }}
    />
  </Drawer.Navigator>
);

export default DrawerNavigator;
