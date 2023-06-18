import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, Image } from "react-native";
import { withNavigation } from "react-navigation";
import { Ionicons } from "@expo/vector-icons";
import PostScreen from "./PostScreen";
import moment from "moment";
import "moment/locale/pt-br";

//Posts mockados temporariamente
posts = [
  {
    id: "1",
    name: "Joe McKay",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis pretium massa. Aliquam erat volutpat.",
    timestamp: 1687124122016,
    avatar: require("../assets/tempAvatar.jpg"),
    image: require("../assets/tempImage1.jpg"),
  },
  {
    id: "2",
    name: "Lucy Smith",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis pretium massa. Aliquam erat volutpat.",
    timestamp: 1569109273726,
    avatar: require("../assets/tempAvatar.jpg"),
    image: require("../assets/tempImage2.jpg"),
  },
  {
    id: "3",
    name: "Jackson White",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis pretium massa. Aliquam erat volutpat.",
    timestamp: 1569109273726,
    avatar: require("../assets/tempAvatar.jpg"),
    image: require("../assets/tempImage3.jpg"),
  },
  {
    id: "4",
    name: "Maria Rodriguez",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis pretium massa. Aliquam erat volutpat.",
    timestamp: 1569109273726,
    avatar: require("../assets/tempAvatar.jpg"),
    image: require("../assets/tempImage4.jpg"),
  },
  {
    id: "5",
    name: "Ricardo Oliveira",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis pretium massa. Aliquam erat volutpat.",
    timestamp: 1569109273726,
    avatar: require("../assets/tempAvatar.jpg"),
    image: require("../assets/tempImage5.jpg"),
  },
];

class FeedScreen extends React.Component {

  renderPost = (post) => {
    return (
      moment.locale("pt-br"),
      (
        <View style={styles.feedItem}>
          <Image source={post.avatar} style={styles.avatar} />
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <View>
                <Text style={styles.name}>{post.name}</Text>
                <Text style={styles.timestamp}>{moment(post.timestamp).fromNow()}</Text>
              </View>

              <Ionicons name="ios-ellipsis-horizontal-sharp" size={24} color="#73788B" />
            </View>

            <Text style={styles.post}>{post.text}</Text>

            <Image source={post.image} style={styles.postImage} resizeMode="cover" />

            <View style={{ flexDirection: "row" }}>
              <Ionicons name="ios-heart-outline" size={24} color="#73788B" style={{ marginRight: 16 }} />
              <Ionicons name="ios-chatbox-ellipses-outline" size={24} color="#73788B" style={{ marginRight: 16 }} />
            </View>
          </View>
        </View>
      )
    );
  };

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
        <FlatList
          style={styles.feed}
          data={posts}
          renderItem={({ item }) => this.renderPost(item)}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />

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
  feed: {
    marginHorizontal: 16,
  },
  feedItem: {
    backgroundColor: "#1C1C1E",
    borderRadius: 5,
    borderBottomColor: "#2C2C2E",
    borderBottomWidth: 1,
    padding: 8,
    flexDirection: "row",
    marginVertical: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16,
  },
  name: {
    fontSize: 15,
    fontWeight: "500",
    color: "#fff",
  },
  timestamp: {
    fontSize: 11,
    color: "#C4C4C4",
    marginTop: 4,
  },
  post: {
    marginTop: 16,
    fontSize: 14,
    color: "#fff",
  },
  postImage: {
    width: undefined,
    height: 150,
    borderRadius: 5,
    marginVertical: 16,
  },
});
