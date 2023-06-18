import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PostScreen from "../screens/PostScreen";

const Stack = createStackNavigator();
const PostStackNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="PostScreen" component={PostScreen} />
  </Stack.Navigator>
);

export default PostStackNavigator;
