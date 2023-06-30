import React from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MapRealtimeScreen from "../screens/MapRealtimeScreen";
import FeedScreen from "../screens/FeedScreen";
import SearchEventsScreen from "../screens/SearchEventsScreen";
import { useRoute } from "@react-navigation/native";

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  const route = useRoute();
  const screenName = route.name;
  return (
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
          tabBarBadge: 2,
        }}
      />
      <Tab.Screen
        name="WHIGO"
        component={MapRealtimeScreen}
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
                marginBottom: 20,
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
        component={SearchEventsScreen}
        options={{
          tabBarLabel: "Eventos",
          tabBarIcon: ({ color }) => <Ionicons name="search" color={color} size={35} style={{ marginBottom: -20 }} />,
        }}
      />
    </Tab.Navigator>
  )
};

export default TabNavigator;
