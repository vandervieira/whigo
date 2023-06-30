import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar, Image, LayoutAnimation } from "react-native";
import auth from "@react-native-firebase/auth";

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    headerShown: null,
  };

  state = {
    email: "",
    password: "",
    errorMessage: null,
  };

  handleLogin = () => {
    const { email, password } = this.state;

    auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          this.setState({ errorMessage: "Este email já está em uso." });
        } else if (error.code === "auth/invalid-email") {
          this.setState({ errorMessage: "Email inválido." });
        } else if (error.code === "auth/user-not-found") {
          this.setState({ errorMessage: "Usuário não encontrado." });
        } else if (error.code === "auth/wrong-password") {
          this.setState({ errorMessage: "Senha incorreta." });
        } else {
          this.setState({ errorMessage: error.code });
        }
      });
  };

  render() {
    LayoutAnimation.easeInEaseOut();
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"></StatusBar>
        
        {/* Header image */}
        <Image
          source={require("../assets/authHeader.png")}
          style={{
            width: 500,
            height: 450,
            resizeMode: "cover",
            marginTop: -180,
            marginLeft: -50,
          }}
        ></Image>

        {/* Footer image */}
        <Image
          source={require("../assets/authFooter.png")}
          style={{
            position: "absolute",
            width: 470,
            height: 300,
            resizeMode: "cover",
            bottom: -140,
            right: -40,
          }}
        ></Image>

        {/* Logo */}
        <Image
          source={require("../assets/loginLogo.png")}
          style={{
            marginTop: -50,
            alignSelf: "center",
            resizeMode: "contain",
            width: 300,
            height: 130,
          }}
        ></Image>

        <View style={styles.errorMessage}>
          {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
        </View>

        <View style={styles.form}>
          <View>
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

        <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
          <Text style={{ color: "#FFF", fontWeight: "500" }}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ alignSelf: "center", marginTop: 32 }}
          onPress={() => this.props.navigation.navigate("Cadastro")}
        >
          <Text style={{ color: "#8A8F9E", fontSize: 13 }}>
            Novo no aplicativo? <Text style={{ fontWeight: "500", color: "#7878F5" }}>Cadastrar-se</Text>
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
    color: "#fff",
    marginTop: -32,
    fontSize: 18,
    fontWeight: "400",
    textAlign: "center",
  },
  errorMessage: {
    marginVertical: 10,
    height: 90,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30,
  },
  error: {
    color: "#E9446A",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 60,
  },
  form: {
    marginTop: -60,
    marginBottom: 10,
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
});
