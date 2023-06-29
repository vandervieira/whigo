import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { useNavigationState, useRoute } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import TabNavigator from "./TabNavigator";
import ProfileStackNavigator from "./ProfileStackNavigator";
import NewEventScreen from "../screens/NewEventScreen";
import EventScreen from "../screens/EventScreen";
import Fire from "../Fire";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {

  return (
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
        options={({ navigation }) => ({
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
              <Ionicons name="person" size={24} color="#7878F5" style={{ marginRight: 10 }} />
            </TouchableOpacity>
          ),
          drawerIcon: ({ focused, size }) => <Ionicons name="home" color={focused ? "#7878F5" : "#666666"} size={size} />,
          drawerLabel: ({ focused }) => <Text style={{ color: focused ? "#7878F5" : "#666666" }}>Inicio</Text>,
        })}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={({ navigation }) => ({
          drawerItemStyle: { height: 0 },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="ios-arrow-back-outline"
                size={32}
                color="#7878F5"
                style={{ marginLeft: 5, marginBottom: 5 }}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => { Fire.shared.signOut() }}>
              <Ionicons
                name="enter-outline"
                size={32}
                color="#7878F5"
                style={{ marginRight: 10, marginBottom: 5 }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Drawer.Screen
        name="NewEvent"
        component={NewEventScreen}
        options={() => ({
          drawerIcon: ({ focused, size }) => <Ionicons name="md-today" color={focused ? "#7878F5" : "#666666"} size={size} />,
          drawerLabel: ({ focused }) => <Text style={{ color: focused ? "#7878F5" : "#666666" }}>Criar Evento</Text>,
        })}
      />
      <Drawer.Screen
        name="Event"
        component={EventScreen}
        options={({ navigation }) => ({
          drawerItemStyle: { height: 0 },
          headerRight: () => (
            <TouchableOpacity onPress={() => console.log("Sharing")}>
              <Ionicons name="share-outline" size={28} color="#7878F5" style={{ marginRight: 5, marginBottom: 5 }} />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="ios-arrow-back-outline"
                size={32}
                color="#7878F5"
                style={{ marginLeft: 5, marginBottom: 5 }}
              />
            </TouchableOpacity>
          ),
        })}
      />
    </Drawer.Navigator>
  )
};

export default DrawerNavigator;
