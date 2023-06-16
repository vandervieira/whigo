import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import storage from "@react-native-firebase/storage";

class Fire {
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
        alert(error);
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

  get userEmail() {
    return auth().currentUser.email;
  }

  get timestamp() {
    return Date.now();
  }
}

Fire.shared = new Fire();
export default Fire;
