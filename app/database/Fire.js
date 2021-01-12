import firebase from "firebase";

class Fire {
  constructor() {
    this.init();
    this.checkAuth();
  }

  init = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyD0nBvKiHtGDRCClteuAVqX6GgR1ZTqPRA",
        authDomain: "testchatapp-611db.firebaseapp.com",
        databaseURL: "https://testchatapp-611db-default-rtdb.firebaseio.com",
        projectId: "testchatapp-611db",
        storageBucket: "testchatapp-611db.appspot.com",
        messagingSenderId: "294071069214",
        appId: "1:294071069214:web:4ab219a0fbd529b3b01c0f",
      });
    }
  };

  checkAuth = () => {
    /**La primera vez devuelve null, por lo tanto entra en el if */
    firebase.auth().onAuthStateChanged((user) => {
      console.log("onAuthStateChanged");
      console.log(user.uid);
      if (!user) {
        firebase
          .auth()
          .signInAnonymously()
          .catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            if (errorCode === "auth/operation-not-allowed") {
              alert("You must enable Anonymous auth in firebase console");
            } else {
              console.error(error);
            }
          });
      }
    });
  };

  send = (messages) => {
    messages.forEach((item) => {
      const message = {
        text: item.text,
        timeStamp: firebase.database.ServerValue.TIMESTAMP,
        user: item.user,
      };
      this.db.push(message);
    });
  };

  parse = (message) => {
    const { user, text, timeStamp } = message.val();
    const { key: _id } = message;
    const createdAt = new Date(timeStamp);

    return {
      _id,
      createdAt,
      text,
      user,
    };
  };

  get = (callback) => {
    this.db.on("child_added", (snapshot) => callback(this.parse(snapshot)));
  };

  off() {
    this.db.off();
  }

  get db() {
    return firebase.database().ref("messages");
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }
}

export default new Fire();
