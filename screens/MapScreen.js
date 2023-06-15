import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, LayoutAnimation } from "react-native";
import auth from "@react-native-firebase/auth";
import MapRealTime from "../components/MapRealTime";

export default class HomeScreen extends React.Component {
  state = {
    email: "",
    displayName: "",
  };

  componentDidMount() {
    const { email, displayName } = auth().currentUser;

    this.setState({ email, displayName });
  }

  signOutUser = () => {
    auth().signOut();
  };

  render() {
    LayoutAnimation.easeInEaseOut();

    return (
      <View style={styles.container}>
        <MapRealTime />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1C1C1E",
    flex: 1,
    alignItems: 'flex-start',
  },
});
