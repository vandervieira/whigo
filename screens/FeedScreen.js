import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, Image } from "react-native";
import { withNavigation } from "react-navigation";
import { Ionicons } from "@expo/vector-icons";
import firestore from "@react-native-firebase/firestore";
import PostScreen from "./PostScreen";
import moment from "moment";
import "moment/locale/pt-br";

class FeedScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      modalVisible: false,
      hasNewPosts: false, // Estado para controlar a presença de novos posts
    };
  }

  componentDidMount() {
    this.fetchPosts(); // Inicialmente, busca os posts existentes
  }

  fetchPosts = () => {
    // Recupera os posts da coleção "posts" e os ordena pelo timestamp
    firestore()
      .collection("posts")
      .orderBy("timestamp", "desc") // Ordena pelo campo "timestamp" em ordem decrescente
      .get()
      .then((querySnapshot) => {
        const posts = [];
        querySnapshot.forEach((doc) => {
          const post = doc.data();

          // Recupera o UID do usuário do post
          const uid = post.uid;

          // Recupera os dados do usuário correspondente usando o UID como ID do documento
          firestore()
            .collection("users")
            .doc(uid)
            .get()
            .then((userDoc) => {
              const user = userDoc.data();

              // Adiciona os dados do usuário ao objeto de post
              post.id = doc.id;
              post.name = user.name;
              post.avatar = user.avatar;

              // Adiciona o post ao array de posts
              posts.push(post);

              // Verifica se todos os posts foram adicionados antes de atualizar o estado
              if (posts.length === querySnapshot.size) {
                // Ordena os posts pelo timestamp
                posts.sort((a, b) => b.timestamp - a.timestamp);

                // Atualiza o estado com os posts populados e ordenados
                this.setState({ posts });

                // Verifica se há novos posts após a busca inicial
                this.subscribeToNewPosts();
              }
            });
        });
      })
      .catch((error) => {
        console.log("Error fetching posts: ", error);
      });
  };

  subscribeToNewPosts = () => {
    firestore()
      .collection("posts")
      .orderBy("timestamp", "desc")
      .limit(1)
      .onSnapshot((querySnapshot) => {
        // Verifica se há alguma alteração na coleção
        if (querySnapshot.docChanges().length > 1) {
          this.setState({ hasNewPosts: true }); // Atualiza o estado para indicar a presença de novos posts
        }
      });
  };

  handleOpenPostModal = () => {
    this.setState({ modalVisible: true });
  };

  handleClosePostModal = () => {
    this.setState({ modalVisible: false });
  };

  handleNewPosts = () => {
    this.setState({ hasNewPosts: false }); // Reseta o estado de novos posts ao clicar no botão
    this.fetchPosts(); // Busca novamente os posts para atualizar o feed
  };

  renderPost = (post) => {
    moment.locale("pt-br");

    let postImage = null;
    if (post.image !== null) {
      postImage = <Image source={{ uri: post.image }} style={styles.postImage} resizeMode="cover" />;
    }

    return (
      <View style={styles.feedItem}>
        <Image source={{ uri: post.avatar }} style={styles.avatar} />
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <View>
              <Text style={styles.name}>{post.name}</Text>
              <Text style={styles.timestamp}>{moment(post.timestamp).fromNow()}</Text>
            </View>
            <Ionicons name="ios-ellipsis-horizontal-sharp" size={24} color="#73788B" />
          </View>
          <Text style={styles.post}>{post.text}</Text>
          {postImage}
          <View style={{ flexDirection: "row" }}>
            <Ionicons name="ios-heart-outline" size={24} color="#73788B" style={{ marginRight: 16 }} />
            <Ionicons name="ios-chatbox-ellipses-outline" size={24} color="#73788B" style={{ marginRight: 16 }} />
          </View>
        </View>
      </View>
    );
  };

  render() {
    const { posts, modalVisible, hasNewPosts } = this.state;

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
        {hasNewPosts && (
          <TouchableOpacity style={styles.newPostsButton} onPress={this.handleNewPosts}>
            <Text style={styles.newPostsButtonText}>Novos posts</Text>
          </TouchableOpacity>
        )}
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
    marginBottom: 16,
    fontSize: 14,
    color: "#fff",
  },
  postImage: {
    width: undefined,
    height: 150,
    borderRadius: 5,
    marginBottom: 16,
  },
  newPostsButton: {
    position: "absolute",
    top: 20,
    zIndex: 1,
    backgroundColor: "#7878F5",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: "center",
  },
  newPostsButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
