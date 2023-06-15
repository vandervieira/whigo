import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import auth from '@react-native-firebase/auth';

const LoadingScreen = ({ navigation }) => {
  useEffect(() => {
    const checkAuthState = () => {
      auth().onAuthStateChanged(user => {
        navigation.navigate(user ? "App" : "Auth");
      });
    };

    checkAuthState();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text>Loading...</Text>
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ({ navigation }) => <LoadingScreen navigation={navigation} />;
