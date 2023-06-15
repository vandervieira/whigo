import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import auth from "@react-native-firebase/auth";

export default class RegisterScreen extends React.Component {
  static navigationOptions = {
    headerShown: null,
  };
  state = {
    email: "",
    password: "",
    errorMessage: null,
  };

  handleSignUp = () => {
    auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((userCredentials) => {
        return userCredentials.user.updateProfile({
          displayName: this.state.name,
        });
      })
      // .catch((error) => this.setState({ errorMessage: error.message }));
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          this.setState({ errorMessage: "Este email já está em uso." });
        } else if (error.code === "auth/invalid-email") {
          this.setState({ errorMessage: "Email inválido." });
        } else if (error.code === "auth/weak-password") {
          this.setState({ errorMessage: "Senha muito fraca." });
        } else if (error.code === "auth/wrong-password") {
          this.setState({ errorMessage: "Senha incorreta." });
        } else {
          this.setState({ errorMessage: error.code });
        }
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"></StatusBar>

        <Image
          source={require("../assets/authHeader.png")}
          style={{
            width: 420,
            height: 300,
            resizeMode: "stretch",
            marginTop: -50,
            marginLeft: -20,
          }}
        ></Image>

        <Image
          source={require("../assets/authFooter.png")}
          style={{
            position: "absolute",
            width: 420,
            height: 300,
            resizeMode: "stretch",
            bottom: -200,
            right: -20,
          }}
        ></Image>

        <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.goBack()}>
          <Ionicons name="ios-arrow-back-outline" size={24} color="#FFF"></Ionicons>
        </TouchableOpacity>

        <View style={{ position: "absolute", top: 64, alignItems: "center", width: "100%" }}>
          <Text style={styles.greeting}>{`Olá!\nCadastre-se para começar.`}</Text>
          <TouchableOpacity style={styles.avatar}>
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
              onChangeText={(name) => this.setState({ name })}
              value={this.state.name}
              required
            ></TextInput>
          </View>

          <View style={{ marginTop: 32 }}>
            <Text style={styles.inputTitle}>Email</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              onChangeText={(email) => this.setState({ email })}
              value={this.state.email}
            ></TextInput>
          </View>

          <View style={{ marginTop: 32 }}>
            <Text style={styles.inputTitle}>Senha</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              autoCapitalize="none"
              onChangeText={(password) => this.setState({ password })}
              value={this.state.password}
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
          <Text style={{ color: "#414959", fontSize: 13 }}>
            Ja tem uma conta? <Text style={{ fontWeight: "500", color: "#7878F5" }}>Entrar</Text>
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
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
    marginTop: 40,
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
    color: "#161F3D",
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
    top: 48,
    left: 32,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(21, 22, 48, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#E1E2E6",
    marginTop: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});
