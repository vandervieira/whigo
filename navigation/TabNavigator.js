import React from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MapScreen from "../screens/MapScreen";
import FeedScreen from "../screens/FeedScreen";
import EventsScreen from "../screens/EventsScreen";

const Tab = createBottomTabNavigator();
const TabNavigator = () => (
  <Tab.Navigator
    initialRouteName="WHIGO"
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: "#7878F5",
      tabBarInactiveTintColor: "#666666",
      tabBarShowLabel: false,
      tabBarStyle: {
        backgroundColor: "#1C1C1E",
      },
      headerStyle: {
        backgroundColor: "#1C1C1E",
      },
    }}
  >
    <Tab.Screen
      name="Feed"
      component={FeedScreen}
      options={{
        tabBarLabel: "Feed",
        tabBarIcon: ({ color }) => <Ionicons name="layers" color={color} size={35} style={{ marginBottom: -20 }} />,
        tabBarBadge: 3,
      }}
    />
    <Tab.Screen
      name="WHIGO"
      component={MapScreen}
      options={{
        tabBarLabel: "WHIGO",
        tabBarIcon: ({ color }) => (
          <View
            style={{
              backgroundColor: "#1C1C1E",
              borderRadius: 50,
              width: 90,
              height: 90,
              borderWidth: 2,
              borderColor: "#666666",
              marginBottom: 10,
            }}
            pointerEvents={"box-none"}
          >
            <Ionicons
              name="location-sharp"
              color={color}
              size={60}
              style={{
                paddingLeft: 12,
                marginTop: 10,
              }}
            />
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="Eventos"
      component={EventsScreen}
      options={{
        tabBarLabel: "Eventos",
        tabBarIcon: ({ color }) => <Ionicons name="search" color={color} size={35} style={{ marginBottom: -20 }} />,
      }}
    />
  </Tab.Navigator>
);

export default TabNavigator;
