import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Fire from "../Fire";

const ProfileScreen = ({ uid }) => {
  const [interests, setInterests] = useState(false);
  const [user, setUser] = useState({});

  const toggleInterests = () => {
    setInterests((prevInterests) => !prevInterests);
  };

  useEffect(() => {
    const userId = uid || Fire.shared.uid;

    const unsubscribe = Fire.shared.firestore
      .collection("users")
      .doc(userId)
      .onSnapshot((doc) => {
        setUser(doc.data());
      });

    return () => {
      unsubscribe();
    };
  }, [uid]);

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 64, alignItems: "center" }}>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={
              user.avatar
                ? { uri: user.avatar }
                : require("../assets/tempAvatar.jpg")
            }
          />
        </View>
        <Text style={styles.name}>{user.name}</Text>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text style={styles.statAmount}>12</Text>
          <Text style={styles.statTitle}>Posts</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statAmount}>21</Text>
          <Text style={styles.statTitle}>Eventos</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statAmount}>52</Text>
          <Text style={styles.statTitle}>Seguidores</Text>
        </View>
      </View>


      <View style={{ marginBottom: 20, alignItems: 'center' }}>
        <View
          style={{
            backgroundColor: '#1C1C1E',
            width: '90%',
            height: 60,
            borderWidth: 0.5,
            borderRadius: 50,
            borderColor: '#7878F5',
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 5,
            paddingRight: 5,
          }}>
          <TouchableOpacity style={{
            width: '50%',
            height: 50,
            backgroundColor: interests === true ? '#1C1C1E' : '#282828',
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}
            onPress={toggleInterests}
          >
            <Text style={{
              color: interests === true ? '#2C2C2E' : '#7878F5',
              fontSize: 16,
              fontWeight: '700'
            }}>EVENTOS</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{
            width: '50%',
            height: 50,
            backgroundColor: interests === false ? '#1C1C1E' : '#282828',
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}
            onPress={toggleInterests}
          >
            <Text style={{
              color: interests === false ? '#2C2C2E' : '#7878F5',
              fontSize: 16,
              fontWeight: '700'
            }}>INTERESSES</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

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

export default ProfileScreen;
