import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Fire from "../Fire";
import * as ImagePicker from "expo-image-picker";

const PostScreen = ({ onClose }) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [userAvatar, setUserAvatar] = useState(null);

  useEffect(() => {
    const fetchUserAvatar = async () => {
      const doc = await Fire.shared.firestore.collection("users").doc(Fire.shared.uid).get();
      setUserAvatar(doc.data().avatar);
    };

    fetchUserAvatar();
  }, []);

  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handlePost = () => {
    Fire.shared.addPost({ text: text.trim(), localUri: image }).then((ref) => {
      setText("");
      setImage(null);
      handleGoBack();
    });
  };

  const handleGoBack = () => {
    onClose();
  };

  return (
    <SafeAreaView edges={["left", "right", "bottom"]} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.addButton} onPress={handleGoBack}>
          <Text style={styles.cancelButton}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.publishButton} onPress={handlePost}>
          <Text style={styles.publishButtonText}>Publicar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Image
          source={userAvatar ? { uri: userAvatar } : require("../assets/tempAvatar.jpg")}
          style={styles.avatar}
        />
        <TextInput
          autoFocus={true}
          multiline={true}
          numberOfLines={4}
          style={styles.input}
          placeholder="Como está o evento?"
          placeholderTextColor="#787880"
          onChangeText={(text) => setText(text)}
          value={text}
        ></TextInput>
      </View>

      <TouchableOpacity style={styles.photo} onPress={handlePickImage}>
        <Ionicons name="md-camera" size={32} color="#9D9D9D" />
      </TouchableOpacity>

      {image && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image}></Image>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C1C1E",
    position: "relative",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 32,
    paddingVertical: 12,
    backgroundColor: "#1C1C1E",
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
  imageContainer: {
    marginHorizontal: 32,
    marginTop: 32,
    height: 150,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default PostScreen;
