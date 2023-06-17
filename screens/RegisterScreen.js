import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Fire from "../Fire";
import * as ImagePicker from "expo-image-picker";

export default class RegisterScreen extends React.Component {
  static navigationOptions = {
    headerShown: null,
  };
  state = {
    user: {
      name: "",
      email: "",
      password: "",
      avatar: null,
    },
    errorMessage: null,
  };

  handlePickAvatar = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.canceled) {
      this.setState({ user: { ...this.state.user, avatar: result.assets[0].uri } });
    }
  };

  handleSignUp = () => {
    Fire.shared.createUser(this.state.user);
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"></StatusBar>

        <Image
          source={require("../assets/authHeader.png")}
          style={{
            resizeMode: "stretch",
            marginTop: -50,
            marginLeft: -20,
          }}
        ></Image>

        <Image
          source={require("../assets/authFooter.png")}
          style={{
            position: "absolute",
            width: 450,
            height: 300,
            resizeMode: "stretch",
            bottom: -200,
            right: -40,
          }}
        ></Image>
        <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.goBack()}>
          <Ionicons name="ios-arrow-back-outline" size={24} color="#FFF"></Ionicons>
        </TouchableOpacity>

        <View style={{ position: "absolute", top: 64, alignItems: "center", width: "100%" }}>
          <Text style={styles.greeting}>{`Olá!\nCadastre-se para começar.`}</Text>
          <TouchableOpacity style={styles.avatarPlaceHolder} onPress={this.handlePickAvatar}>
            <Image source={{ uri: this.state.user.avatar }} style={styles.avatar} />
            <Ionicons name="ios-add" size={40} color="#FFF" style={{ marginTop: 0, marginLeft: 2 }}></Ionicons>
          </TouchableOpacity>
        </View>

        <View style={styles.errorMessage}>
          {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
        </View>

        <View style={styles.form}>
          <View>
            <Text style={styles.inputTitle}>Nome completo</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              onChangeText={(name) => this.setState({ user: { ...this.state.user, name } })}
              value={this.state.user.name}
              required
            ></TextInput>
          </View>

          <View style={{ marginTop: 32 }}>
            <Text style={styles.inputTitle}>Email</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              onChangeText={(email) => this.setState({ user: { ...this.state.user, email } })}
              value={this.state.user.email}
            ></TextInput>
          </View>

          <View style={{ marginTop: 32 }}>
            <Text style={styles.inputTitle}>Senha</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              autoCapitalize="none"
              onChangeText={(password) => this.setState({ user: { ...this.state.user, password } })}
              value={this.state.user.password}
            ></TextInput>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
          <Text style={{ color: "#FFF", fontWeight: "500" }}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ alignSelf: "center", marginTop: 32 }}
          onPress={() => this.props.navigation.navigate("Entrar")}
        >
          <Text style={{ color: "#8A8F9E", fontSize: 13 }}>
            Ja tem uma conta? <Text style={{ fontWeight: "500", color: "#7878F5" }}>Entrar</Text>
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2C2C2E",
    flex: 1,
  },
  greeting: {
    marginTop: 32,
    fontSize: 18,
    fontWeight: "400",
    textAlign: "center",
    color: "#FFF",
  },
  errorMessage: {
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30,
  },
  error: {
    color: "#E9446A",
    marginTop: 60,
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
  form: {
    marginTop: 0,
    marginBottom: 40,
    marginHorizontal: 30,
  },
  inputTitle: {
    color: "#8A8F9E",
    fontSize: 10,
    textTransform: "uppercase",
  },
  input: {
    borderBottomColor: "#8A8F9E",
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: "#fff",
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: "#7878F5",
    borderRadius: 4,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
  back: {
    position: "absolute",
    top: 60,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 16,
    backgroundColor: "rgba(21, 22, 48, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarPlaceHolder: {
    width: 100,
    height: 100,
    backgroundColor: "#8A8F9E",
    borderRadius: 50,
    marginTop: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
