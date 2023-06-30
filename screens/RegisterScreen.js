import React from "react";
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import auth from "@react-native-firebase/auth";
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
    if (this.state.user.name && this.state.user.email && this.state.user.password) {
      auth()
        .createUserWithEmailAndPassword(this.state.user.email, this.state.user.password)
        .then((userCredentials) => {
          // Obter o usuário atual após a criação da conta
          const { user } = userCredentials;

          // Atualizar o perfil do usuário com o nome fornecido
          return user.updateProfile({
            displayName: this.state.user.name,
          }).then(() => user);
        })
        .then((user) => {
          const uid = user.uid; // Obter o uid do usuário atual
          Fire.shared.createUser(uid, this.state.user); // Chamar a função createUser com o uid correto
        })
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
    } else {
      this.setState({ errorMessage: "Preencha todos os campos." });
    }

    setTimeout(() => {
      this.setState({ errorMessage: null });
    }, 3000);
  };

  render() {
    return (
      <View style={styles.container}>
        {/* Header image */}
        <Image
          source={require("../assets/authHeader.png")}
          style={{
            width: 500,
            height: 450,
            resizeMode: "cover",
            marginTop: -200,
            marginLeft: -50,
          }}
        />

        {/* Back button */}

        <View style={styles.back}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
            <Ionicons name="ios-arrow-back-outline" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
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
        />

        {/* Photo avatar upload */}
        <View style={{ position: "absolute", marginTop: 40, alignItems: "center", width: "100%" }}>
          <Text style={styles.greeting}>Cadastre-se para começar.</Text>
          <TouchableOpacity style={styles.avatarPlaceHolder} onPress={this.handlePickAvatar}>
            {this.state.user.avatar ? (
              <Image source={{ uri: this.state.user.avatar }} style={styles.avatar} />
            ) : (
              <Ionicons name="ios-add" size={40} color="#FFF" style={{ marginTop: 0, marginLeft: 2 }} />
            )}
          </TouchableOpacity>
        </View>

        {/* Error message */}
        <View style={styles.errorMessage}>
          {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* Name */}
          <View>
            <Text style={styles.inputTitle}>Nome completo</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              onChangeText={(name) => this.setState({ user: { ...this.state.user, name } })}
              value={this.state.user.name}
              required
            />
          </View>

          {/* Email */}
          <View style={{ marginTop: 32 }}>
            <Text style={styles.inputTitle}>Email</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              onChangeText={(email) => this.setState({ user: { ...this.state.user, email } })}
              value={this.state.user.email}
            />
          </View>

          {/* Password */}
          <View style={{ marginTop: 32 }}>
            <Text style={styles.inputTitle}>Senha</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              autoCapitalize="none"
              onChangeText={(password) => this.setState({ user: { ...this.state.user, password } })}
              value={this.state.user.password}
            />
          </View>
        </View>

        {/* Signup Button */}
        <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
          <Text style={{ color: "#FFF", fontWeight: "500" }}>Cadastrar</Text>
        </TouchableOpacity>

        {/* Go To Login Button */}
        <TouchableOpacity
          style={{ alignSelf: "center", marginTop: 32 }}
          onPress={() => this.props.navigation.navigate("Entrar")}
        >
          <Text style={{ color: "#8A8F9E", fontSize: 13 }}>
            Já tem uma conta? <Text style={{ fontWeight: "500", color: "#7878F5" }}>Entrar</Text>
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
    marginTop: 18,
    fontSize: 18,
    fontWeight: "400",
    textAlign: "center",
    color: "#FFF",
  },
  errorMessage: {
    marginBottom: 20,
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
    color: "#FFF",
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
    zIndex: 1, //OMGGGGGGGGGG
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(21, 22, 48, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarPlaceHolder: {
    width: 100,
    height: 100,
    backgroundColor: "#8A8F9E",
    borderRadius: 50,
    marginTop: 80,
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
