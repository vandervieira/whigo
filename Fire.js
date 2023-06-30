import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import storage from "@react-native-firebase/storage";

class Fire {
  addEvent = async ({ localUri, name, category, visibility, cep, city, stateAddress, neighborhood, address, addressNumber, fullAddress, latitude, longitude, description }) => {
    let remoteUri = null;
    if (localUri) {
      remoteUri = await this.uploadPhotoAsync(localUri, `eventImages/${this.uid}/${Date.now()}`);
    }

    return new Promise((res, rej) => {
      this.firestore
        .collection("events")
        .add({
          uid: this.uid,
          timestamp: this.timestamp,
          image: remoteUri ? remoteUri : null,
          name,
          category,
          visibility,
          cep,
          city,
          stateAddress,
          neighborhood,
          address,
          addressNumber,
          fullAddress,
          latitude,
          longitude,
          description,
          peopleInterested: 0,
          peopleGoing: 0,
        })
        .then((ref) => {
          res(ref);
        })
        .catch((error) => {
          rej(error);
        });
    });
  };

  addPost = async ({ text, localUri }) => {
    let remoteUri = null;
    if (localUri) {
      remoteUri = await this.uploadPhotoAsync(localUri, `postImages/${this.uid}/${Date.now()}`);
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
        (snapshot) => { },
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

  createUser = async (uid, user) => {
    let remoteUri = null;
    let db = this.firestore.collection("users").doc(uid); // Usar o uid fornecido como argumento

    db.set({
      name: user.name,
      email: user.email,
      avatar: null,
    });

    if (user.avatar) {
      remoteUri = await this.uploadPhotoAsync(user.avatar, `avatars/${uid}`);

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
