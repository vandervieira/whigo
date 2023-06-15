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

        <Image
          source={require("../assets/authHeader.png")}
          style={{
            width: 420,
            height: 300,
            resizeMode: "stretch",
            marginTop: -100,
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
            bottom: -170,
            right: -20,
          }}
        ></Image>

        <Image
          source={require("../assets/loginLogo.png")}
          style={{
            marginTop: -100,
            alignSelf: "center",
            width: 200,
            height: 200,
          }}
        ></Image>

        <Text style={styles.greeting}>{`Bem-vindo\nao Whigo!`}</Text>

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
          <Text style={{ color: "#414959", fontSize: 13 }}>
            Novo no aplicativo? <Text style={{ fontWeight: "500", color: "#7878F5" }}>Cadastrar-se</Text>
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
    marginTop: -32,
    fontSize: 18,
    fontWeight: "400",
    textAlign: "center",
  },
  errorMessage: {
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30,
  },
  error: {
    color: "#E9446A",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
  form: {
    marginBottom: 48,
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
});
