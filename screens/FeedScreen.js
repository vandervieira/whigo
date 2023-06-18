import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { withNavigation } from "react-navigation";
import { Ionicons } from "@expo/vector-icons";
import PostScreen from "./PostScreen";

class FeedScreen extends React.Component {
  state = {
    modalVisible: false,
  };

  handleOpenPostModal = () => {
    this.setState({ modalVisible: true });
  };

  handleClosePostModal = () => {
    this.setState({ modalVisible: false });
  };

  render() {
    const { modalVisible } = this.state;

    return (
      <View style={styles.container}>
        <Text style={{ color: "white", fontSize: 30 }}>FEED</Text>

        <TouchableOpacity style={styles.addButton} onPress={this.handleOpenPostModal}>
          <Ionicons name="ios-add" size={24} color="#fff" />
        </TouchableOpacity>

        <Modal visible={modalVisible} animationType="slide">
          <PostScreen onClose={this.handleClosePostModal} />
        </Modal>
      </View>
    );
  }
}

export default withNavigation(FeedScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1C1C1E",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#7878F5",
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
