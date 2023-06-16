import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default class EventsScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{color: "white", fontSize: 20}}>Procurar Eventos</Text>
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
