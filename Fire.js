import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import storage from "@react-native-firebase/storage";

class Fire {
  addPost = async ({ text, localUri }) => {
    const remoteUri = null;
    if(localUri) {
    const remoteUri = await this.uploadPhotoAsync(localUri, `postImages/${this.uid}/${Date.now()}`);
    }

    return new Promise((res, rej) => {
      this.firestore
        .collection("posts")
        .add({
          text,
          uid: this.uid,
          timestamp: this.timestamp,
          image: remoteUri ? remoteUri : null,
        })
        .then((ref) => {
          res(ref);
        })
        .catch((error) => {
          rej(error);
        });
    });
  };

  uploadPhotoAsync = async (uri, filename) => {
    return new Promise(async (res, rej) => {
      let upload = storage().ref(filename).putFile(uri);

      upload.on(
        "state_changed",
        (snapshot) => {},
        (err) => {
          rej(err);
        },
        async () => {
          const url = await upload.snapshot.ref.getDownloadURL();
          res(url);
        }
      );
    });
  };

  createUser = async (user) => {
    let remoteUri = null;
    await auth()
      .createUserWithEmailAndPassword(user.email, user.password)
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

    let db = this.firestore.collection("users").doc(this.uid);

    db.set({
      name: user.name,
      email: user.email,
      avatar: null,
    });

    if (user.avatar) {
      remoteUri = await this.uploadPhotoAsync(user.avatar, `avatars/${this.uid}`);

      db.set({ avatar: remoteUri }, { merge: true });
    }
  };

  signOut = () => {
    auth().signOut();
  };

  get firestore() {
    return firestore();
  }

  get uid() {
    return (auth().currentUser || {}).uid;
  }

  get userName() {
    return auth().currentUser.displayName;
  }

  get userAvatar() {
    return auth().currentUser.photoURL;
  }

  get userEmail() {
    return auth().currentUser.email;
  }

  get timestamp() {
    return Date.now();
  }
}

Fire.shared = new Fire();
export default Fire;
