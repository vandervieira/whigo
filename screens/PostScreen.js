import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Fire from "../Fire";
import * as ImagePicker from "expo-image-picker";

export default class PostScreen extends React.Component {
  state = {
    text: "",
    image: null,
    userAvatar: null,
  };

  componentDidMount() {
    userAvatar = Fire.shared.firestore.collection("users").doc(Fire.shared.uid).get().then((doc) => {
        this.setState({ userAvatar: doc.data().avatar });
        }
    );
  }

  handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.canceled) {
      this.setState({ image: result.assets[0].uri });
    }
  };

  handlePost = () => {
    Fire.shared.addPost({ text: this.state.text.trim(), localUri: this.state.image }).then((ref) => {
      this.setState({ text: "", image: null });
      this.handleGoBack();
    });
  };

  handleGoBack = () => {
    this.props.onClose();
  };
  render() {
    return (
      <SafeAreaView
        edges={["left", "right", "bottom"]}
        style={{
          flex: 1,
          backgroundColor: "#1C1C1E",
          position: "relative",
        }}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.addButton} onPress={this.handleGoBack}>
            <Text style={styles.cancelButton}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.publishButton} onPress={this.handlePost}>
            <Text style={styles.publishButtonText}>Publicar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Image
            source={this.state.userAvatar ? { uri: this.state.userAvatar } : require("../assets/tempAvatar.jpg")}
            style={styles.avatar}
          />
          <TextInput
            autoFocus={true}
            multiline={true}
            numberOfLines={4}
            style={styles.input}
            placeholder="Como está o evento?"
            placeholderTextColor="#787880"
            onChangeText={(text) => this.setState({ text })}
            value={this.state.text}
          ></TextInput>
        </View>

        <TouchableOpacity style={styles.photo} onPress={this.handlePickImage}>
          <Ionicons name="md-camera" size={32} color="#9D9D9D" />
        </TouchableOpacity>

        <View style={{ marginHorizontal: 32, marginTop: 32, height: 150 }}>
          <Image source={{ uri: this.state.image }} style={{ width: "100%", height: "100%" }}></Image>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    edges: ["left", "right", "bottom"],
    flex: 1,
    backgroundColor: "#1C1C1E",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 32,
    paddingVertical: 12,
    backgroundColor: "#1C1C1E",
    paddingHorizontal: 16,
  },
  cancelButton: {
    color: "#7878F5",
    fontSize: 16,
    paddingVertical: 8,
  },
  publishButton: {
    backgroundColor: "#7878F5",
    borderRadius: 30,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginLeft: "auto",
  },
  publishButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  inputContainer: {
    margin: 15,
    flexDirection: "row",
    backgroundColor: "#1C1C1E",
  },
  input: {
    color: "#fff",
    flex: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  photo: {
    alignItems: "flex-end",
    marginHorizontal: 32,
  },
});
