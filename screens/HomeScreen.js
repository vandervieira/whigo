import React from "react"
import { View, Text, StyleSheet, TouchableOpacity, LayoutAnimation } from "react-native"
import auth from '@react-native-firebase/auth';
import MapRealTime from "../components/MapRealTime";

export default class HomeScreen extends React.Component {
  state = {
    email: "",
    displayName: ""
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
        <Text>Olá {this.state.displayName}!</Text>
        <TouchableOpacity onPress={this.signOutUser}>
          <Text>Sair</Text>
        </TouchableOpacity>
        {/* <MapRealTime /> */}
      </View>
    )
  }
}   

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});