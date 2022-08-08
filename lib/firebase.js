import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_FIREBASE_PROJECT_ID,
};

const initFirebase = async () => {
  try {
    firebase.initializeApp(firebaseConfig);
  } catch (err) {
    /*
     * We skip the "already exists" message which is
     * not an actual error when we're hot-reloading.
     */
    if (!/already exists/u.test(err.message)) {
      // eslint-disable-next-line no-console
      console.error("Firebase admin initialization error", err.stack);
    }
  }
};

initFirebase();

export const getOwnerType = async (email) => {
  var snapshot = await firebase
    .firestore()
    .collection("users")
    .where("email", "==", email)
    .get()
    .catch((err) => {
      console.log(err);
      return Promise.reject(err);
    });
  return snapshot.userType;
};

/*Attempts to authenticate a user with a given email and password.*/
export const signIn = async (email, password) => {
  try {
    const userCredentials = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    return userCredentials.user;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("Error " + errorCode + ": " + errorMessage);
    throw error;
  }
};

export const resetPassword = async (email) => {
  try {
    const userCredentials = await firebase.auth().sendPasswordResetEmail(email);
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("Error " + errorCode + ": " + errorMessage);
    throw error;
  }
};

export const signUp = async (
  userType,
  email,
  password,
  fullName,
  interests
) => {
  try {
    const userCredentials = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    const userId = userCredentials.user.uid;
    await firebase.firestore().collection("users").doc(userId).set({
      fullName: fullName,
      email: email,
      userType: userType,
      interests: interests,
      projectsDonatedTo: {},
    });
    userCredentials.user.sendEmailVerification();
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;

    console.log("Error " + errorCode + ": " + errorMessage);
    throw Error(error.code);
  }
};

export const addDonation = async (userId, projectId, stripeId, amount) => {
  console.log(userId);
  firebase
    .firestore()
    .collection("donations")
    .add({
      userId: firebase.firestore().doc(`/users/${userId}`),
      projectId: firebase.firestore().doc(`/projects/${projectId}`),
      amount: amount,
      stripeId: stripeId,
    })
    .then(() => {
      console.log("Document successfully written!");
      return null;
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
      return error;
    });
};

export const addProject = async (project) => {
  const db = firebase.firestore();
  const projectRef = db.collection("projects").doc();
  const id = projectRef.id;
  projectRef
    .set({
      id: id,
      published: firebase.firestore.FieldValue.serverTimestamp(),
      updated: firebase.firestore.FieldValue.serverTimestamp(),
      ...project,
    })
    .then(() => {
      console.log("Project is succesfully added");
      return null;
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
      return error;
    });
};

export const addImages = async (images, title) => {
  // const db = firebase.firestore();
  const storage = firebase.storage();
  // const projectRef = db.collection("projects").doc();
  // const id = projectRef.id;
  images.map(file => {
    storage
    .ref(`images/${title}/${file.name}`)
    .put(file)
  }).then(() => {
    console.log("Images uploaded successfully");
  }).catch((error) => {
    console.log("Error writing document: ", error);
    return error;
  });
  
};

export const getUsersDonatedForAProject = async (projectId) => {
  const projectRef = firebase.firestore().collection("projects").doc(projectId);

  const snapshot = await firebase
    .firestore()
    .collection("donations")
    .where("projectId", "==", projectRef)
    .get()
    .catch((err) => {
      console.log(err);
      return Promise.reject(err);
    });

  return snapshot.docs.map(
    async (doc) => await getDoc("users", doc.data().userId.id)
  );
};

export const getOwnerProjects = async (userId) => {
  const projects = firebase
    .firestore()
    .collection("projects")
    .where("ownerId", "==", userId)
    .get()
    .catch((err) => {
      console.log(err);
      return Promise.reject(err);
    });
  const k = (await projects).docs.map(async (doc) => doc.data());
  console.log(k);
  return k;
};

export const getUserProjects = async (userId) => {
  initFirebase();
  const userRef = firebase.firestore().collection("users").doc(userId);

  var snapshot = await firebase
    .firestore()
    .collection("donations")
    .where("userId", "==", userRef)
    .get()
    .catch((err) => {
      console.log(err);
      return Promise.reject(err);
    });
  return snapshot.docs.map(
    async (doc) => await getDoc("projects", doc.data().projectId.id)
  );
};

export const getDoc = async (collection, Id) => {
  try {
    const user = await firebase
      .firestore()
      .collection(collection)
      .doc(Id)
      .get();

    if (user.exists) {
      return user.data();
    }
    throw new Error("No such document");
  } catch (error) {
    console.log("Error getting doc", err);
  }
};

export const getAllProjects = async () => {
  initFirebase();

  const snapshot = await firebase.firestore().collection("projects").get();
  return snapshot.docs.map((doc) => doc.data());
};

export const getSearchProjects = async (keyword, category, location) => {
  initFirebase();
  let snapshot;
  if (category.length > 0) {
    snapshot = await firebase
      .firestore()
      .collection("projects")
      .where("tagName", "in", category)
      .get();
  } else {
    snapshot = await firebase.firestore().collection("projects").get();
  }

  const filtered = snapshot.docs.filter(
    (doc) =>
      doc.data().title.toLowerCase().indexOf(keyword.toLowerCase()) >= 0 ||
      doc.data().description.toLowerCase().indexOf(keyword.toLowerCase()) >= 0
  );

  const filtered2 = filtered.filter(
    (doc) =>
      doc.data().location.toLowerCase().indexOf(location.toLowerCase()) >= 0
  );

  return filtered2.map((doc) => doc.data());
};

export const getProjectDoc = async (projectId) =>  {
  return firebase
    .firestore()
    .collection("projects")
    .doc(projectId)
    .get()
    .then((projectDoc) => {
      if (projectDoc.exists) {
        return Promise.resolve(projectDoc);
      } else {
        return Promise.reject("no such document project");
      }
    })
    .catch((err) => {
      console.log(err);
      return Promise.reject(err);
    });
}

export const getProjectsByDonor = async (userId) => {
  return firebase
    .firestore()
    .collection("users")
    .doc(userId)
    .get()
    .then(async (userDoc) => {
      if (userDoc.exists) {
        const projects = userDoc.data().projectsDonatedTo;
        if (projects) {
          const promises = Object.keys(projects).map(getProjectDoc);
          return Promise.allSettled(promises).then((results) => {
            return results
              .filter((x) => x.status === "fulfilled")
              .map((x) => x.value);
          });
        } else {
          return [];
        }
      } else {
        console.log("no such user");
        return [];
      }
    });
};

export const deleteProj = async (projectId) => {
  // delete project document on firebase based on projectId
  return firebase
    .firestore()
    .collection("projects")
    .doc(projectId)
    .delete().then(() => {
      console.log("Document successfully deleted!");
    })
    .catch((error) => {
        console.error("Error removing document: ", error);
    });
};

export const updateProjAmt = async(projectId, amount) => {
  const projRef = firebase.firestore().collection('projects').doc(projectId);
  const doc = await projRef.get();
  if (!doc.exists) {
    console.log('No such document!');
  } else {
    let amt = doc.data().curAmt + amount/100.0;
    const res = await projRef.update({curAmt: amt});
  }
}

export const createTransaction = async(name, amount, project_name, project_id, email) => {
  const res = await firebase.firestore().collection('donations').add({
    name: name,
    donation: amount/100.0,
    date: new Date(),
    project_name: project_name,
    project_id: project_id,
    email: email,
  });
}



export default firebase;
