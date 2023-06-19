import React from "react";
import { View, Text, StyleSheet, Button, Image, LayoutAnimation, TouchableOpacity } from "react-native";
import Fire from "../Fire";

export default class ProfileScreen extends React.Component {
  state = {
    user: {},
  };

  unsubscribe = null;

  componentDidMount() {
    const user = this.props.uid || Fire.shared.uid;

    this.unsubscribe = Fire.shared.firestore
      .collection("users")
      .doc(user)
      .onSnapshot((doc) => {
        this.setState({ user: doc.data() });
      });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    LayoutAnimation.easeInEaseOut();
    return (
      <View style={styles.container}>
        <View style={{ marginTop: 64, alignItems: "center" }}>
          <View style={styles.avatarContainer}>
            <Image
              style={styles.avatar}
              source={this.state.user.avatar ? { uri: this.state.user.avatar } : require("../assets/tempAvatar.jpg")}
            />
          </View>
          <Text style={styles.name}>{this.state.user.name}</Text>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statAmount}>21</Text>
            <Text style={styles.statTitle}>Eventos</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statAmount}>52</Text>
            <Text style={styles.statTitle}>Seguidores</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statAmount}>12</Text>
            <Text style={styles.statTitle}>Posts</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => {
            Fire.shared.signOut();
          }}
        >
          <Text style={styles.logoutButtonText}>Sair</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1C1C1E",
    flex: 1,
  },
  avatarContainer: {
    shadowColor: "#151734",
    shadowRadius: 30,
  },
  avatar: {
    width: 136,
    height: 136,
    borderRadius: 68,
  },
  name: {
    color: "white",
    marginTop: 24,
    fontSize: 16,
    fontWeight: "600",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 32,
  },
  stat: {
    alignItems: "center",
    flex: 1,
  },
  statAmount: {
    color: "white",
    fontSize: 18,
    fontWeight: "300",
  },
  statTitle: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
    marginTop: 4,
  },
  logoutButton: {
    backgroundColor: "#7878F5",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: "center",
  },
  logoutButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
