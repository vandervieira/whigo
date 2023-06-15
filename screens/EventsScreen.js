import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, LayoutAnimation } from "react-native";
import auth from "@react-native-firebase/auth";

export default class EventsScreen extends React.Component {
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
        <Text style={{color: "white"}}>Olá {this.state.displayName}!</Text>
        <TouchableOpacity onPress={this.signOutUser}>
          <Text style={{color: "red"}}>Sair</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1C1C1E",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
